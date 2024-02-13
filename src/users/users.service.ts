import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ICreateUser } from './interface';
import { User, UserRole } from '@prisma/client';
import {
	NullableUser,
	UserWithPosts,
	UserWithPostsOrNull
} from './types/users.types';
import { UsersRepository } from './users.repository';
import { SecurityService } from '../security/security.service';
import { PreSaveUserDto } from './dto';
import { ValidateService } from '../validate/validate.service';
import { ErrorHandlerService } from '../errro-catch/error-catch.service';
import { NullableSortOrder } from '../common/global-types';

@Injectable()
export class UsersService {
	private readonly logger: Logger = new Logger(UsersService.name);

	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly securityService: SecurityService,
		private readonly validateService: ValidateService,
		private readonly errorHandlerService: ErrorHandlerService
	) {}

	/**
	 * @method create
	 * @public
	 * @async
	 * @description Создание нового пользователя, с сохранением данных в бд
	 * @param {ICreateUser} createData - Объект данных для создания пользователя
	 * @param {User} user - Пользователь который выполняет создание нового пользователя.
	 * @returns {Promise<UserWithPosts>} - Сохраненный пользователь, с постами
	 * @throws {InternalServerErrorException} Если произошла ошибка валиадции
	 * @throws {ConflictException} Если пользователь найден, выбрасывается исключение о конфликте
	 * @throws {UnauthorizedException} выбрасывается исключение, если роль пользователя не 'admin'
	 * @see {@link checkUserRole} Метод для проверки роли пользователя, который пытается создать нового пользователя.
	 * @see {@link checkIfUserExistsByEmail} Метод для проверки, свободен ли email нового пользователя.
	 * @see {@link SecurityService.hashPassword} Метод для хеширования пароля нового пользователя.
	 * @see {@link validateUserBeforeSaving} Метод для валидации данных нового пользователя перед их сохранением.
	 * @see {@link UsersRepository.saveUser} Метод для сохранения нового пользователя в базе данных.
	 * @see {@link ErrorHandlerService.handleError} Метод для обработки ошибок, которые могут возникнуть в процессе создания нового пользователя.
	 */
	public async create(
		createData: ICreateUser,
		user: User
	): Promise<UserWithPosts> {
		try {
			this.logger.log(
				`create: Starting process, userId:${user.id}, email:${createData.email}`
			);
			this.checkUserRole(user);
			this.logger.debug(`create: User role checked, userId:${user.id}`);
			await this.checkIfUserExistsByEmail(createData.email);
			this.logger.debug(
				`create: Email verified, userId:${user.id}, email:${createData.email}`
			);
			createData.uniquepassword = await this.securityService.hashPassword(
				createData.uniquepassword
			);
			this.logger.debug(`create: Password hashed, userId:${user.id}`);
			await this.validateUserBeforeSaving(createData);
			this.logger.debug(
				`create: User validated before saving, userId:${user.id}, email:${createData.email}`
			);
			return await this.usersRepository.saveUser(createData);
		} catch (error) {
			this.logger.error(
				`create: Error in process, userId:${user.id}, email:${createData.email}, error:${error.message}`
			);
			this.errorHandlerService.handleError(error);
		}
	}

	/**
	 * @method validateUserBeforeSaving
	 * @private
	 * @async
	 * @description Валидация сохраняеммых данных перед сохранением
	 * @param {ICreateUser} createData - Объект сохраняемый при создании пользователя
	 * @returns {Promise<void>} Ничего не возвращает
	 * @throws {InternalServerErrorException} Если произошла ошибка валиадции
	 * @see {@link ValidateService.validateDto} Метод валидации сохраняемого объекта
	 */
	private async validateUserBeforeSaving(
		createData: ICreateUser
	): Promise<void> {
		this.logger.log(
			`Starting validateUserBeforeSaving, email:${createData.email}`
		);
		const validateObj: PreSaveUserDto = {
			...createData
		};
		return this.validateService.validateDto(PreSaveUserDto, validateObj);
	}

	/**
	 * @method checkIfUserExistsByEmail
	 * @private
	 * @async
	 * @description Проверка наличия пользователя, если пользователь найден - выброс исключения
	 * @param {string} email - email пользователя, который нужно проверить
	 * @returns {Promise<void>} Ничего не возвращает
	 * @throws {ConflictException} Если пользователь найден, выбрасывается исключение о конфликте
	 * @see {@link UsersRepository.findUserByEmail} Поиск пользователя по email
	 * @see {@link rejectIfUserExists} Метод проверки пользователя
	 */
	private async checkIfUserExistsByEmail(email: string): Promise<void> {
		this.logger.log(
			`checkIfUserExistsByEmail: Starting process, email: ${email}`
		);
		const user: NullableUser =
			await this.usersRepository.findUserByEmail(email);
		this.logger.debug(
			`checkIfUserExistsByEmail: User search completed. email: ${email}, user exists:${!!user}`
		);
		this.rejectIfUserExists(user);
	}

	/**
	 * @method rejectIfUserExists
	 * @private
	 * @description Проверка наличия пользователя, если пользователь найден, отказ в регистрации
	 * @param {NullableUser} user - найденный объект пользователя (User) или null
	 * @returns {void} ничего не возвщает
	 * @throws {ConflictException} пользователь найден, email адрес занят
	 */
	private rejectIfUserExists(user: NullableUser): void {
		this.logger.log(
			`rejectIfUserExists: Starting process. user exists: ${!!user}.`
		);
		if (user) {
			this.logger.warn(
				`rejectIfUserExists: User found. Registration denied, email:${user.email}.`
			);
			throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
		}
	}

	/**
	 * @method rejectIfUcheckUserRoleserExists
	 * @private
	 * @description Проверка роли пользователя, eсли роль пользователя не 'admin', выбрасывается исключение
	 * @param {User} user - Объект проверяемого пользователя
	 * @returns {void} ничего не возвщает
	 * @throws {UnauthorizedException} выбрасывается исключение, если роль пользователя не 'admin'
	 */
	private checkUserRole(user: User): void {
		this.logger.log(`checkUserRole: Starting process, userId: ${user.id}.`);
		if (user.role !== UserRole.admin) {
			this.logger.warn(
				`Unauthorized access attempt by user, userId: ${user.id}.`
			);
			throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
		}
	}

	/**
	 * @method findOne
	 * @public
	 * @async
	 * @description Получение пользователя по id(действие может выполнять только админ)
	 * @param {number} id - ID получаемого пользователя
	 * @param {User} user - Пользователь который выполняет создание нового пользователя.
	 * @returns {Promise<UserWithPosts>} - найденый пользователь с постами.
	 * @throws {NotFoundException} Если пользователь найден, выбрасывается исключение
	 * @throws {UnauthorizedException} выбрасывается исключение, если роль пользователя не 'admin'
	 * @see {@link checkUserRole} Метод для проверки роли пользователя, который пытается создать нового пользователя.
	 * @see {@link getUserById} Метод для поиска пользователя по id.
	 * @see {@link ErrorHandlerService.handleError} Метод для обработки ошибок, которые могут возникнуть в процессе создания нового пользователя.
	 */
	public async findOne(id: number, user: User): Promise<UserWithPosts> {
		try {
			this.logger.log(`findOne: Starting process, userId:${user.id}.`);
			this.checkUserRole(user);
			this.logger.debug(`findOne: User role checked, userId:${user.id}`);
			this.validateService.validateNumber(id);
			return this.getUserById(id);
		} catch (error) {
			this.logger.error(
				`findOne: Error in process, userId:${user.id}, error:${error.message}.`
			);
			this.errorHandlerService.handleError(error);
		}
	}

	/**
	 * @method getUserById
	 * @private
	 * @async
	 * @description Поиск пользователя по id, если пользователь не найден - выброс исключения.
	 * @param {number} id - id пользователя для поиска
	 * @returns {Promise<UserWithPosts>} найденый пользователь с постами
	 * @throws {NotFoundException} Если пользователь найден, выбрасывается исключение
	 * @see {@link UsersRepository.findUserById} Поиск пользователя по id
	 * @see {@link handleUser} Метод проверки пользователя наличия пользователя
	 */
	public async getUserById(id: number): Promise<UserWithPosts> {
		this.logger.log(`getUserById: Starting process, userId: ${id}`);
		const user: UserWithPostsOrNull =
			await this.usersRepository.findUserById(id);
		this.logger.debug(
			`getUserById: User search completed, userId: ${id}, user exists:${!!user}`
		);
		this.handleUser(user);
		return user;
	}

	/**
	 * @method handleUser
	 * @private
	 * @description Проверка наличия пользователя, если пользователь не найдет - выброс исключения
	 * @param {UserWithPostsOrNull} user - найденный объект пользователя  или null
	 * @returns {void} ничего не возвщает
	 * @throws {NotFoundException} Если пользователь найден, выбрасывается исключение
	 */
	private handleUser(user: UserWithPostsOrNull): void {
		this.logger.log(`handleUser: Starting process. user exists: ${!!user}.`);
		if (!user) {
			this.logger.warn(`handleUser: User not found.`);
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}
	}

	/**
	 * @method findAll
	 * @public
	 * @async
	 * @description Получение пользователя по id(действие может выполнять только админ)
	 * @param {number} limit - количество получаемых пользователей
	 * @param {number} offset - кол-во пропускаемых пользователей
	 * @param {NullableSortOrder} order - формат сортировки
	 * @param {User} user - Пользователь который выполняет создание нового пользователя.
	 * @returns {Promise<UserWithPosts[]>} - массив пользователей с их постами.
	 * @throws {UnauthorizedException} выбрасывается исключение, если роль пользователя не 'admin'
	 * @see {@link checkUserRole} Метод для проверки роли пользователя, который пытается создать нового пользователя.
	 * @see {@link UsersRepository.findManyUsers} Метод получение пользователей с их постами
	 * @see {@link ErrorHandlerService.handleError} Метод для обработки ошибок, которые могут возникнуть в процессе создания нового пользователя.
	 */
	public async findAll(
		limit: number,
		offset: number,
		order: NullableSortOrder,
		user: User
	): Promise<UserWithPosts[]> {
		try {
			this.logger.log(`findAll: Starting process, userId:${user.id}.`);
			this.checkUserRole(user);
			this.logger.debug(`findOne: User role checked, userId:${user.id}`);
			this.validateService.validateNumber(limit);
			this.validateService.validateNumber(offset);
			return await this.usersRepository.findManyUsers(limit, offset, order);
		} catch (error) {
			this.logger.error(
				`findOne: Error in process, userId:${user.id}, error:${error.message}.`
			);
			this.errorHandlerService.handleError(error);
		}
	}
}
