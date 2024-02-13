import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

/**
 * @class ErrorHandlerService
 * @description Сервис для обработки ошибок
 */
@Injectable()
export class ErrorHandlerService {
	private readonly logger: Logger = new Logger(ErrorHandlerService.name);

	/**
	 * @method handleError
	 * @description Метод обработки ошибок, в зависимости от типа ошибки вызывает соответствующий обработчик
	 * @param {any} error - Ошибка для обработки
	 */
	public handleError(error: any): void {
		this.logger.error(
			`handleError: An error occurred, error: ${error.message}`
		);
		if (error instanceof HttpException) {
			return this.handleHttpException(error);
		} else if (error instanceof jwt.TokenExpiredError) {
			return this.handleTokenExpiredError();
		} else if (error instanceof jwt.JsonWebTokenError) {
			return this.handleJsonWebTokenError();
		} else {
			return this.handleUnknownError(error);
		}
	}

	/**
	 * @method handleHttpException
	 * @private
	 * @description Метод обработки ошибок HttpException
	 * @param {HttpException} error - Ошибка для обработки
	 */
	private handleHttpException(error: HttpException): void {
		this.logger.error(
			`handleHttpException: Throwing HttpException with message: ${error.message}`
		);
		throw error;
	}

	/**
	 * @method handleTokenExpiredError
	 * @private
	 * @description Метод обработки ошибок истечения срока действия токена
	 */
	private handleTokenExpiredError(): void {
		this.logger.warn(`handleTokenExpiredError: Throwing TokenExpiredError.`);
		throw new HttpException(
			'Срок действия токена истек',
			HttpStatus.BAD_REQUEST
		);
	}

	/**
	 * @method handleJsonWebTokenError
	 * @private
	 * @description Метод обработки ошибок jwt
	 */
	private handleJsonWebTokenError(): void {
		this.logger.warn(`handleJsonWebTokenError: Throwing JsonWebTokenError.`);
		throw new HttpException('Недействительный токен', HttpStatus.BAD_REQUEST);
	}

	/**
	 * @method handleUnknownError
	 * @private
	 * @description Метод обработки неизвестных ошибок
	 * @param {any} error - Ошибка для обработки
	 */
	private handleUnknownError(error: any): void {
		this.logger.fatal(
			`handleUnknownError: Critical error occurred, error: ${error.message}`
		);
		throw new HttpException(
			'Internet server error',
			HttpStatus.INTERNAL_SERVER_ERROR
		);
	}
}
