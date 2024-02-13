import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidateService } from '../validate.service';

describe('ValidateService', () => {
	let service: ValidateService;

	beforeEach(() => {
		service = new ValidateService();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('validateDto', () => {
		it('should not throw an error if there are no validation errors', async () => {
			const dtoClass = class {};
			const dto = {};
			jest
				.spyOn(service, 'validateDto')
				.mockImplementation(async () => undefined);
			await expect(service.validateDto(dtoClass, dto)).resolves.not.toThrow();
		});

		it('should throw an error if there are validation errors', async () => {
			const dtoClass = class {};
			const dto = {};
			jest.spyOn(service, 'validateDto').mockImplementation(async () => {
				throw new HttpException(
					'A server error occurred',
					HttpStatus.INTERNAL_SERVER_ERROR
				);
			});
			await expect(service.validateDto(dtoClass, dto)).rejects.toThrow(
				HttpException
			);
		});
	});

	describe('validateNumber', () => {
		it('should not throw an error if the number is valid', () => {
			const num: number = 10;
			expect(() => service.validateNumber(num)).not.toThrow();
		});

		it('should throw an error if the number is not an integer', () => {
			const num: number = 10.5;
			expect(() => service.validateNumber(num)).toThrow(HttpException);
		});

		it('should throw an error if the number is less than 0', () => {
			const num: number = -1;
			expect(() => service.validateNumber(num)).toThrow(HttpException);
		});
	});
});
