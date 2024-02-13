import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { TokenTypeEnum } from './models/enums/token-type.enum';
import { JwtPayloadType } from './models/types/jwt.type';
import { JWT_ALGORITHM } from '../common/global-const';
import { GeneratorService } from '../generator/generator.service';
import { ConfigLoaderService } from '../config/config-loader.service';

/**
 * @class JwtService
 * @description Сервис для работы с jwt
 */
@Injectable()
export class JwtService {
	private readonly logger: Logger = new Logger(JwtService.name);

	constructor(
		private readonly configLoaderService: ConfigLoaderService,
		private readonly generatorService: GeneratorService
	) {}

	/**
	 * @method createJwtToken
	 * @async
	 * @private
	 * @description Метод для создания jwt токена
	 * @param {JwtPayloadType} payload - Полезная нагрузка т
	 * @param {string | Buffer} secret - Секрет для подписи токена
	 * @param {jwt.SignOptions} options - Опции для подписи токена
	 * @returns {Promise<string>} Созднный Токен
	 */
	private async createJwtToken(
		payload: JwtPayloadType,
		secret: string | Buffer,
		options: jwt.SignOptions
	): Promise<string> {
		this.logger.log(`createJwtToken: Starting process, userId: ${payload.id}.`);
		return jwt.sign(payload, secret, options);
	}

	/**
	 * @method generateToken
	 * @async
	 * @public
	 * @description Метод генерации токена
	 * @param {User} user - Пользователь для которого генерируется токен
	 * @param {TokenTypeEnum} tokenType - Тип токена который нужно сгенерировать
	 * @returns {Promise<string>} Созданный токен
	 * @throws {BadRequestException} Неизвестный тип токена
	 */
	public async generateToken(
		user: User,
		tokenType: TokenTypeEnum
	): Promise<string> {
		this.logger.log(`generateToken: Starting process, userId: ${user.id}`);
		switch (tokenType) {
			case TokenTypeEnum.ACCESS:
				return await this.generateAccessToken(user);
			case TokenTypeEnum.REFRESH:
				return await this.generateRefreshToken(user);
			default:
				this.logger.error(
					`generateToken: Unsupported token type: ${tokenType}, userId: ${user.id}`
				);
				throw new HttpException(
					`Неподдерживаемый тип токена: ${tokenType}`,
					HttpStatus.BAD_REQUEST
				);
		}
	}

	/**
	 * @method generateAccessToken
	 * @async
	 * @private
	 * @description Метод для генерации токена доступа
	 * @param {User} user - Пользователь для которого генерируется токен
	 * @returns {Promise<string>}  Сгенерированный токен
	 */
	private async generateAccessToken(user: User): Promise<string> {
		this.logger.log(
			`generateAccessToken: Starting process, userId: ${user.id}`
		);
		const { privateKey: accessSecret, time: accessTime } =
			this.configLoaderService.jwtConfig.access;
		const jwtid: string = this.generatorService.generateUuid();
		this.logger.debug(`generateAccessToken: Generated completed.`);
		return await this.createJwtToken(
			{ id: user.id, role: user.role },
			accessSecret,
			{
				issuer: this.configLoaderService.issuer,
				audience: this.configLoaderService.domain,
				algorithm: JWT_ALGORITHM,
				expiresIn: accessTime,
				jwtid
			}
		);
	}

	/**
	 * @method generateRefreshToken
	 * @async
	 * @private
	 * @description Метод для генерации токена обновления.
	 * @param {User} user - Пользователь для которого генерируется токен
	 * @returns {Promise<string>}  Сгенерированный токен
	 */
	private async generateRefreshToken(user: User): Promise<string> {
		this.logger.log(
			`generateRefreshToken: Starting process, userId: ${user.id}`
		);
		const { privateKey: refreshSecret, time: refreshTime } =
			this.configLoaderService.jwtConfig.refresh;
		const jwtid: string = this.generatorService.generateUuid();
		this.logger.debug(`generateAccessToken: Generated completed.`);
		return await this.createJwtToken(
			{
				id: user.id,
				role: user.role
			},
			refreshSecret,
			{
				issuer: this.configLoaderService.issuer,
				audience: this.configLoaderService.domain,
				algorithm: JWT_ALGORITHM,
				expiresIn: refreshTime,
				jwtid
			}
		);
	}

	/**
	 * @method verifyRefreshToken
	 * @async
	 * @description Метод проверки токена обновления
	 * @param {string} token - Токен для проверки
	 * @returns {Promise<JwtPayloadType>} Полезная нагрузка токена
	 */
	public async verifyRefreshToken(token: string): Promise<JwtPayloadType> {
		this.logger.log(`verifyRefreshToken: Starting process.`);
		const { publicKey, time: accessTime } =
			this.configLoaderService.jwtConfig.refresh;
		const jwtOptions: jwt.VerifyOptions = this.createJwtOptions();
		return await this.verifyTokenAsync(
			token,
			publicKey,
			jwtOptions,
			accessTime
		);
	}

	/**
	 * @method createJwtOptions
	 * @description Метод для создания опций првоверки jwt
	 * @returns {jwt.VerifyOptions} Возвращает опции  проверки jwt
	 */
	private createJwtOptions(): jwt.VerifyOptions {
		this.logger.log(`createJwtOptions: Starting process.`);
		return {
			issuer: this.configLoaderService.issuer,
			audience: new RegExp(this.configLoaderService.domain)
		};
	}

	/**
	 * @method verifyTokenAsync
	 * @async
	 * @description Метод для проверки jwt токена
	 * @param {string} token - Токен для проверки
	 * @param {string | Buffer} publicKey - Публичный ключ для проверки подписи токена.
	 * @param {jwt.VerifyOptions} jwtOptions - Опции для проверки токена
	 * @param {number} time  - время жизни токена
	 * @returns {Promise<JwtPayloadType>} Полезная нагрузка токена
	 * */
	private async verifyTokenAsync(
		token: string,
		publicKey: string,
		jwtOptions: jwt.VerifyOptions,
		time: number
	): Promise<JwtPayloadType> {
		this.logger.log(`verifyTokenAsync: Starting process.`);
		return new Promise((resolve, reject) => {
			jwt.verify(
				token,
				publicKey,
				{ ...jwtOptions, maxAge: time },
				(error, payload: JwtPayloadType) => {
					if (error) {
						this.logger.warn(
							`verifyTokenAsync: Error verifying token, error: ${error.message}`
						);
						reject(error);
						return;
					}
					this.logger.log(
						`verifyTokenAsync: Token verified successfully, userId:${payload.id}.`
					);
					resolve(payload);
				}
			);
		});
	}
}
