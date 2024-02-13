import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

/**
 * @description Количество раундов для генерации хэша
 */
const ROUND_PASSWORD: number = 10;

/**
 * @class SecurityService
 * @description Сервис для хэширования и валиадции данных
 */
@Injectable()
export class SecurityService {
	private readonly logger: Logger = new Logger(SecurityService.name);

	/**
	 * @method hashPassword
	 * @public
	 * @async
	 * @description Хеширует пароль с использованием bcrypt
	 * @param {string} password - Пароль для хеширования
	 * @returns {Promise<string>} Хешированный пароль
	 */
	public async hashPassword(password: string): Promise<string> {
		this.logger.log(`Starting hashPassword`);
		return await bcrypt.hash(password, ROUND_PASSWORD);
	}

	/**
	 * @method compareValues
	 * @public
	 * @async
	 * @description Сравнивает хешированное значение с исходным значением c помощью bcrypt
	 * @param {string} hashedValue - Хешированное значение
	 * @param {string} value - Исходное значение
	 * @returns {Promise<boolean>} Результат сравнения
	 */
	public async compareValues(
		hashedValue: string,
		value: string
	): Promise<boolean> {
		this.logger.log(`Starting compareValues`);
		return await bcrypt.compare(value, hashedValue);
	}
}
