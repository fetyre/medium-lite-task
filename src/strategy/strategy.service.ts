import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ValidateService } from 'src/validate/validate.service';
import { ConfirmPayload } from './interface/confirm-stategy.interface';
import { User, UserRole } from '@prisma/client';
import { NullableUser } from 'src/users/types/users.types';
import { UsersRepository } from 'src/users/users.repository';
import { ValidateConfirmPayload } from './dto/confirmation-strategy.dto';

/**
 * @class StrategyService
 * @description Сервис для работы со стратегиями
 */
@Injectable()
export class StrategyService {
	private readonly logger: Logger = new Logger(StrategyService.name);

	constructor(
		private readonly validateService: ValidateService,
		private readonly usersRepository: UsersRepository
	) {}

	/**
	 * @method validatePayload
	 * @async
	 * @description Метод для валидации полезной нагрузки
	 * @param {ConfirmPayload} payload - Полезная нагрузка для валидации
	 * @returns {Promise<ConfirmPayload>}  Полезная нагрузка прошедшая валиадцию
	 */
	public async validatePayload(
		payload: ConfirmPayload
	): Promise<ConfirmPayload> {
		this.logger.log(`validatePayload: Starting process, userId:${payload.id}.`);
		const value: ValidateConfirmPayload = {
			id: payload.id,
			jti: payload.jti,
			role: payload.role
		};
		await this.validateService.validateDto(ValidateConfirmPayload, value);
		this.logger.debug(
			`validatePayload: Payload validated. userId: ${value.id}`
		);
		return value;
	}

	/**
	 * @method checkAndFindUserById
	 * @async
	 * @description Метод для проверки и поиска пользователя по id
	 * @param {number} id - ID пользователя для поиска
	 * @returns {Promise<User>} Найденный пользователь
	 * @throws {NotFoundException} Если пользователь не найден
	 */
	public async checkAndFindUserById(id: number): Promise<User> {
		this.logger.log(`checkAndFindUserById: Starting process, userId: ${id}.`);
		const user: NullableUser =
			await this.usersRepository.findUserWithoutPostsById(id);
		this.logger.debug(
			`getUserById: User search completed, userId: ${id}, user exists:${!!user}`
		);
		this.checkUser(user);
		return user;
	}

	/**
	 * @method checkUser
	 * @description Метод для проверки существования пользователя
	 * @param {NullableUser} user - Пользователь для проверки или null
	 * @returns {void} Ничего
	 * @throws {NotFoundException} Если пользователь не найден
	 */
	private checkUser(user: NullableUser): void {
		this.logger.log(`checkUser: Starting process. user exists: ${!!user}.`);
		if (!user) {
			this.logger.warn(`checkUser: User not found.`);
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}
	}

	/**
	 * @method checkRoleUser
	 * @description Метод  проверки роли пользователя
	 * @param {string} userRole - Роль пользователя для проверки
	 * @param {UserRole} requiredRole - Требуемая роль
	 * @returns {void} Ничего
	 * @throws {ForbiddenException} Если роли не совпадают
	 */
	public checkRoleUser(userRole: string, requiredRole: UserRole): void {
		this.logger.log(
			`checkRoleUser: Starting process, userRole:${userRole}, requiredRole:${requiredRole}.`
		);
		if (userRole !== requiredRole) {
			throw new HttpException('Ошибка доступа', HttpStatus.FORBIDDEN);
		}
	}
}
