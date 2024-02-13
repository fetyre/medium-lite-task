import { HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ErrorHandlerService } from '../error-catch.service';

describe('ErrorHandlerService', () => {
	let service: ErrorHandlerService;

	beforeEach(() => {
		service = new ErrorHandlerService();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('handleError', () => {
		it('should throw the same HttpException if the error is an instance of HttpException', () => {
			const error: HttpException = new HttpException(
				'Test',
				HttpStatus.BAD_REQUEST
			);
			expect(() => service.handleError(error)).toThrow(error);
		});

		it('should throw a BadRequestException if the error is an instance of TokenExpiredError', () => {
			const error: jwt.TokenExpiredError = new jwt.TokenExpiredError(
				'Test',
				new Date()
			);
			expect(() => service.handleError(error)).toThrow(
				new HttpException('Срок действия токена истек', HttpStatus.BAD_REQUEST)
			);
		});

		it('should throw a BadRequestException if the error is an instance of JsonWebTokenError', () => {
			const error: jwt.JsonWebTokenError = new jwt.JsonWebTokenError('Test');
			expect(() => service.handleError(error)).toThrow(
				new HttpException('Недействительный токен', HttpStatus.BAD_REQUEST)
			);
		});

		it('should throw an InternalServerErrorException if the error is not an instance of HttpException, TokenExpiredError, or JsonWebTokenError', () => {
			const error: Error = new Error('Test');
			expect(() => service.handleError(error)).toThrow(
				new HttpException(
					'Internet server error',
					HttpStatus.INTERNAL_SERVER_ERROR
				)
			);
		});
	});
});
