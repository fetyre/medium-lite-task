import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ValidationError, validate } from 'class-validator';

/**
 * @description  отсутствие ошибок валидации.
 */
const NO_ERRORS: number = 0;

/**
 * @description минимальное числовое значение
 */
const MIN_NUMBER: number = 0;

/**
 * @class ValidateService
 * @description Сервис для валидации данных.
 */
@Injectable()
export class ValidateService {
	private readonly logger: Logger = new Logger(ValidateService.name);

	/**
	 * @method validateDto
	 * @async
	 * @public
	 * @description Метод для валидации dto.
	 * @param {new () => T} dtoClass - Класс dto для валидации
	 * @param {V} dto - Объект dto для валидации
	 * @returns {Promise<void>} Ничего
	 * @throws {InternalServerErrorException} Ошибка валиадции
	 */
	public async validateDto<T extends object, V extends object>(
		dtoClass: new () => T,
		dto: V
	): Promise<void> {
		this.logger.log('Starting validateDto');
		const errors: ValidationError[] = await validate(
			Object.assign(new dtoClass(), dto)
		);
		return this.checkValidateObject(errors);
	}

	/**
	 * @method checkValidateObject
	 * @private
	 * @description Метод проверки результатов валидации
	 * @param {ValidationError[]} errors - ошибоки валидации
	 * @returns {void} Ничего
	 * @throws {InternalServerErrorException} Ошибка валиадции
	 */
	private checkValidateObject(errors: ValidationError[]): void {
		this.logger.log(
			`Starting checkValidateObject, number of mistakes: ${errors.length}`
		);
		if (errors.length > NO_ERRORS) {
			this.logger.fatal(`Error in checkValidateObject, error: ${errors}`);
			throw new HttpException(
				'A server error occurred',
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	/**
	 * @method validateNumber
	 * @description Метод для валидации числа
	 * @param {number} num - Число для валидации
	 * @returns {void} Ничего н
	 * @throws {BadRequestException} Если число не является целым или меньше нуля
	 */
	public validateNumber(num: number): void {
		this.logger.log(`validateNumber: Starting process, number:${num}`);
		if (!Number.isInteger(num) || num < MIN_NUMBER) {
			this.logger.error(`validateNumber: Invalid input, number:${num}`);
			throw new HttpException(
				'Ошибка введенных данных',
				HttpStatus.BAD_REQUEST
			);
		}
	}
}
