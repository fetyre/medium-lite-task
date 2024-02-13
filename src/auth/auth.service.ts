import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { User } from '@prisma/client';
import { SecurityService } from '../security/security.service';
import { IAuth, ISignIn, ITokens, IUpdateToken } from './interface';
import { TokenTypeEnum } from '../jwt/models/enums/token-type.enum';
import { JwtService } from '../jwt/jwt.service';
import { UserWithPosts, UserWithPostsOrNull } from '../users/types/users.types';
import { ErrorHandlerService } from '../errro-catch/error-catch.service';
import { JwtPayloadType } from '../jwt/models/types/jwt.type';
import { UsersService } from '../users/users.service';

/**
 * @description Индекс access токена для generateTokens
 */
const ACCESS_INDEX: number = 0;

/**
 * @description Индекс refresh токена для generateTokens
 */
const REFRESH_INDEX: number = 1;

/**
 * @class AuthService
 * @description Сервис аутентификации пользователя
 */
@Injectable()
export class AuthService {
	private readonly logger: Logger = new Logger(AuthService.name);

	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly securityService: SecurityService,
		private readonly jwtService: JwtService,
		private readonly errorHandlerService: ErrorHandlerService,
		private readonly usersService: UsersService
	) {}

	/**
	 * @method signIn
	 * @async
	 * @public
	 * @description Метод входа пользователя в систему
	 * @param {ISignIn} data - Данные для входа
	 * @returns {Promise<IAuth>} Даныне пользваотеля с jwt токенами
	 * @throws {UnauthorizedException} когда неверный пароль или почта
	 */
	public async signIn(data: ISignIn): Promise<IAuth> {
		try {
			this.logger.log(`signIn: Starting process, email: ${data.email}`);
			const userWitnPosts: UserWithPosts = await this.fetchUserByEmail(
				data.email
			);
			this.logger.debug(
				`signIn: User found, userId: ${userWitnPosts.id}, email: ${userWitnPosts.email}`
			);
			const { posts, viewedPosts, ...user } = userWitnPosts;
			await this.validatePassword(user, data.uniquepassword);
			this.logger.debug(
				`signIn: password valid, userId: ${user.id}, email: ${user.email}`
			);
			const token: ITokens = await this.generateTokens(user);
			return { user: userWitnPosts, token };
		} catch (error) {
			this.logger.error(
				`signIn: Error in process, email: ${data.email}, error:${error.message}`
			);
			this.errorHandlerService.handleError(error);
		}
	}

	/**
	 * @method generateTokens
	 * @async
	 * @private
	 * @description Метод для генерации jwt токенов
	 * @param {User} user - Пользователь для которого генерируются токены
	 * @returns {Promise<ITokens>} Сгенерируемые токены
	 */
	public async generateTokens(user: User): Promise<ITokens> {
		this.logger.log(`generateTokens: Starting process, userId:${user.id}`);
		const tokens: [string, string] = await Promise.all([
			this.jwtService.generateToken(user, TokenTypeEnum.ACCESS),
			this.jwtService.generateToken(user, TokenTypeEnum.REFRESH)
		]);
		this.logger.debug(`generateTokens: Tokens generated, userId:${user.id}`);
		return {
			accessToken: tokens[ACCESS_INDEX],
			refreshToken: tokens[REFRESH_INDEX]
		};
	}

	/**
	 * @method fetchUserByEmail
	 * @async
	 * @description Метод для поиска пользователя по email
	 * @param {string} email - email пользователя
	 * @returns {Promise<UserWithPosts>} Пользователь с постами
	 * @throws {UnauthorizedException} Если пользователь не найден
	 */
	private async fetchUserByEmail(email: string): Promise<UserWithPosts> {
		this.logger.log(`fetchUserByEmail: Starting process, email: ${email}`);
		const user: UserWithPostsOrNull =
			await this.usersRepository.findUserByEmail(email);
		this.logger.debug(
			`fetchUserByEmail: User search completed. email: ${email}, user exists:${!!user}`
		);
		this.validateUserExistence(user);
		return user;
	}

	/**
	 * @method validateUserExistence
	 * @private
	 * @description Метод для проверки существования пользователя
	 * @param {UserWithPostsOrNull} user - Найденный пользователь или null
	 * @returns {void} Ничего
	 * @throws {UnauthorizedException} Если пользователь не найден
	 */
	private validateUserExistence(user: UserWithPostsOrNull): void {
		this.logger.log(
			`validateUserExistence: Starting process, user exists: ${!!user}.`
		);
		if (!user) {
			this.logger.warn(
				`validateUserExistence: User not found, user exists: ${!!user}.`
			);
			throw new HttpException(
				'Неверный пароль или почта',
				HttpStatus.UNAUTHORIZED
			);
		}
	}

	/**
	 * @method validatePassword
	 * @async
	 * @private
	 * @description Метод проверки пароля пользователя
	 * @param {User} user - Пользователь пароль которого проверяется
	 * @param {string} uniquepassword - Пароль который проверяется
	 * @returns {Promise<boolean>} Результаты проверки.
	 * @throws {UnauthorizedException} Если валидация пароля не прошла
	 */
	private async validatePassword(
		user: User,
		uniquepassword: string
	): Promise<boolean> {
		this.logger.log(`validatePassword: Starting process, userId: ${user.id}`);
		const isValidPassword: boolean = await this.securityService.compareValues(
			user.uniquepassword,
			uniquepassword
		);
		this.logger.debug(
			`validatePassword: Verification result: ${isValidPassword}`
		);
		this.checkValidatePassword(isValidPassword);
		return isValidPassword;
	}

	/**
	 * @method checkValidatePassword
	 * @description Метод для проверки результата валидации пароля
	 * @param {boolean} isValid - Результат валидации пароля
	 * @returns {void} Ничего
	 * @throws {UnauthorizedException} Если валидация пароля не прошла
	 */
	private checkValidatePassword(isValid: boolean): void {
		this.logger.log(
			`checkValidatePassword: Starting process, validate exists: ${isValid}`
		);
		if (!isValid) {
			this.logger.warn(
				`checkValidatePassword: Validation failed, isValid: ${isValid}`
			);
			throw new HttpException(
				'Неверный пароль или почта',
				HttpStatus.UNAUTHORIZED
			);
		}
	}

	/**
	 * @method updateToken
	 * @async
	 * @description Метод для обновления токена доступа
	 * @param {IUpdateToken} updateData - Токен обнолвнеия
	 * @returns {Promise<IAuth>}Даныне пользваотеля с jwt токенами
	 * @throws {NotFoundException} Если пользователь найден, выбрасывается исключение
	 */
	public async updateToken(updateData: IUpdateToken): Promise<IAuth> {
		try {
			this.logger.log(`updateToken: Starting process.`);
			const payload: JwtPayloadType = await this.jwtService.verifyRefreshToken(
				updateData.token
			);
			this.logger.debug(`updateToken: Token valid, userId:${payload.id}.`);
			const user: UserWithPosts = await this.usersService.getUserById(
				payload.id
			);
			this.logger.debug(`updateToken: User found, userId:${payload.id}.`);
			const accessToken: string = await this.jwtService.generateToken(
				user,
				TokenTypeEnum.ACCESS
			);
			this.logger.log(
				`updateToken: Access token successfully generated. userId: ${user.id}`
			);
			return { user, token: { accessToken, refreshToken: updateData.token } };
		} catch (error) {
			this.logger.error(
				`updateToken: Error in process. error: ${error.message}`
			);
			this.errorHandlerService.handleError(error);
		}
	}
}
