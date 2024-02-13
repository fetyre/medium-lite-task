import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { User, UserRole } from '@prisma/client';
import { ErrorHandlerService } from '../../errro-catch/error-catch.service';
import { SecurityService } from '../../security/security.service';
import { ValidateService } from '../../validate/validate.service';
import { UsersRepository } from '../users.repository';
import { UserWithPosts } from '../types/users.types';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('UsersService', () => {
	let service: UsersService;

	const mockUser: UserWithPosts = {
		id: 1,
		name: 'User',
		email: 'test@test.com',
		uniquepassword: 'Password123',
		role: UserRole.user,
		posts: [],
		viewedPosts: []
	};

	const mockAdminUser: User = {
		id: 1,
		name: 'User',
		email: 'exaample@bk.ru',
		uniquepassword: 'Password123',
		role: UserRole.admin
	};

	const mockCreateData = {
		email: 'test@test.com',
		uniquepassword: 'Password123',
		name: 'Name',
		role: UserRole.user
	};

	beforeEach(async () => {
		const mockUsersRepository = {
			findUserByEmail: jest.fn().mockResolvedValue(mockUser),
			saveUser: jest.fn().mockResolvedValue(mockUser),
			findUserById: jest.fn().mockResolvedValue(mockUser),
			findManyUsers: jest.fn().mockResolvedValue([mockUser, mockUser])
		};

		const mockSecurityService = {
			compareValues: jest.fn().mockResolvedValue(true),
			hashPassword: jest.fn().mockResolvedValue('hashedPassword')
		};

		const mockValidateService = {
			validateDto: jest.fn().mockResolvedValue(undefined),
			validateNumber: jest.fn().mockResolvedValue(undefined)
		};

		const errorHandlerMock = {
			handleError: jest.fn().mockImplementation(error => {
				throw error;
			})
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{
					provide: UsersRepository,
					useValue: mockUsersRepository
				},
				{
					provide: SecurityService,
					useValue: mockSecurityService
				},
				{
					provide: ValidateService,
					useValue: mockValidateService
				},
				{
					provide: ErrorHandlerService,
					useValue: errorHandlerMock
				}
			]
		}).compile();

		service = module.get<UsersService>(UsersService);
	});

	describe('create', () => {
		it('should create a user and return it', async () => {
			const notFound = jest.spyOn(
				service['usersRepository'],
				'findUserByEmail'
			);
			notFound.mockResolvedValue(undefined);
			const savedUser = jest.spyOn(service['usersRepository'], 'saveUser');
			savedUser.mockResolvedValue(mockUser);
			const validateUserBeforeSavingMock = jest.spyOn(
				service['validateService'],
				'validateDto'
			);
			validateUserBeforeSavingMock.mockResolvedValue(undefined);
			const result = await service.create(mockCreateData, mockAdminUser);
			expect(result).toEqual(mockUser);
		});

		it('should create a user and return it when the user is an admin', async () => {
			await expect(
				service.create(mockCreateData, mockAdminUser)
			).rejects.toThrow();
		});

		it('should throw an error when a user with the same email already exists', async () => {
			await expect(service.create(mockCreateData, mockUser)).rejects.toThrow();
		});

		it('should throw a validation error when a non-admin user tries to create a user', async () => {
			const validateUserBeforeSavingMock = jest.spyOn(
				service['validateService'],
				'validateDto'
			);
			validateUserBeforeSavingMock.mockRejectedValue(
				new HttpException('Validation error', HttpStatus.BAD_REQUEST)
			);
			await expect(service.create(mockCreateData, mockUser)).rejects.toThrow();
		});
	});

	describe('findOne', () => {
		it('should return a user when a valid id is provided', async () => {
			const findUserByIdMock = jest.spyOn(
				service['usersRepository'],
				'findUserById'
			);
			findUserByIdMock.mockResolvedValue(mockUser);

			const result = await service.findOne(1, mockAdminUser);
			expect(result).toEqual(mockUser);
			expect(findUserByIdMock).toHaveBeenCalledWith(1);
		});

		it('should throw an error when the user does not exist', async () => {
			const findUserByIdMock = jest.spyOn(
				service['usersRepository'],
				'findUserById'
			);
			findUserByIdMock.mockResolvedValue(null);

			await expect(service.findOne(1, mockAdminUser)).rejects.toThrow();
		});

		it('should throw an error when a non-admin user tries to find a user by id', async () => {
			await expect(service.findOne(1, mockUser)).rejects.toThrow();
		});

		it('should throw an error when the id is not a number', async () => {
			const validateNumberMock = jest.spyOn(
				service['validateService'],
				'validateNumber'
			);
			validateNumberMock.mockImplementation(() => {
				throw new Error('Invalid number');
			});
			await expect(service.findOne(1, mockAdminUser)).rejects.toThrow();
		});
	});

	describe('findAll', () => {
		it('should return all users when a valid limit and offset are provided', async () => {
			const findManyUsersMock = jest.spyOn(
				service['usersRepository'],
				'findManyUsers'
			);
			findManyUsersMock.mockResolvedValue([mockUser]);

			const result = await service.findAll(10, 0, 'asc', mockAdminUser);
			expect(result).toEqual([mockUser]);
			expect(findManyUsersMock).toHaveBeenCalledWith(10, 0, 'asc');
		});

		it('should throw an error when a non-admin user tries to fetch all users', async () => {
			const findManyUsersMock = jest.spyOn(
				service['usersRepository'],
				'findManyUsers'
			);
			findManyUsersMock.mockResolvedValue([mockUser]);

			const result = service.findAll(10, 0, 'asc', mockUser);
			expect(result).rejects.toThrow();
		});
	});
});
