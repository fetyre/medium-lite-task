import { Test, TestingModule } from '@nestjs/testing';
import { ErrorHandlerService } from '../../errro-catch/error-catch.service';
import { JwtService } from '../../jwt/jwt.service';
import { SecurityService } from '../../security/security.service';
import { UsersRepository } from '../../users/users.repository';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';
import { UserRole } from '@prisma/client';
import { UserWithPosts } from '../../users/types/users.types';

describe('AuthService', () => {
	let service: AuthService;

	const mockUser: UserWithPosts = {
		id: 1,
		name: 'User',
		email: 'example@bk.ru',
		uniquepassword: 'Password123',
		role: UserRole.user,
		posts: [],
		viewedPosts: []
	};
	const post = {
		id: 1,
		title: 'Test Post',
		content: 'Test Content',
		authorId: 1,
		author: mockUser,
		viewers: []
	};
	const mockToken = { accessToken: 'access', refreshToken: 'refresh' };

	beforeEach(async () => {
		const mockUsersRepository = {
			findUserByEmail: jest.fn().mockResolvedValue(mockUser)
		};

		const mockSecurityService = {
			compareValues: jest.fn().mockResolvedValue(true)
		};

		const errorHandlerMock = {
			handleError: jest.fn().mockImplementation(error => {
				throw error;
			})
		};

		const mockJwtService = {
			verifyRefreshToken: jest.fn(),
			generateToken: jest.fn()
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{ provide: UsersRepository, useValue: mockUsersRepository },
				{ provide: SecurityService, useValue: mockSecurityService },
				{ provide: JwtService, useValue: mockJwtService },
				{ provide: ErrorHandlerService, useValue: errorHandlerMock },
				{ provide: UsersService, useValue: {} }
			]
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('signIn', () => {
		it('should return a user and token if valid credentials are provided', async () => {
			const userMock = jest.spyOn(
				service['usersRepository'],
				'findUserByEmail'
			);
			userMock.mockResolvedValue(mockUser);
			const validateMock = jest.spyOn(
				service['securityService'],
				'compareValues'
			);
			validateMock.mockResolvedValue(true);
			jest
				.spyOn(service, 'generateTokens')
				.mockImplementation(() => Promise.resolve(mockToken));
			expect(
				await service.signIn({
					email: 'test@test.com',
					uniquepassword: 'password'
				})
			).toEqual({ user: mockUser, token: mockToken });
		});

		it('should throw an error when the user is not found', async () => {
			const userMock = jest.spyOn(
				service['usersRepository'],
				'findUserByEmail'
			);
			userMock.mockResolvedValue(undefined);
			expect(
				service.signIn({ email: 'test@test.com', uniquepassword: 'password' })
			).rejects.toThrow();
		});

		it('should throw an error when password validate fails', async () => {
			const userMock = jest.spyOn(
				service['usersRepository'],
				'findUserByEmail'
			);
			userMock.mockResolvedValue(mockUser);
			const validateMock = jest.spyOn(
				service['securityService'],
				'compareValues'
			);
			validateMock.mockResolvedValue(false);
			expect(
				service.signIn({ email: 'test@test.com', uniquepassword: 'password' })
			).rejects.toThrow();
		});

		it('should throw an error when generateTokens fails', async () => {
			const userMock = jest.spyOn(
				service['usersRepository'],
				'findUserByEmail'
			);
			userMock.mockResolvedValue(mockUser);
			const validateMock = jest.spyOn(
				service['securityService'],
				'compareValues'
			);
			validateMock.mockResolvedValue(true);
			jest.spyOn(service, 'generateTokens').mockImplementation(() => {
				throw new Error('Error message');
			});
			expect(
				service.signIn({ email: 'test@test.com', uniquepassword: 'password' })
			).rejects.toThrow();
		});
	});

	describe('updateToken', () => {
		it('should throw an error when the user is not found', async () => {
			const userMock = jest.spyOn(
				service['usersRepository'],
				'findUserByEmail'
			);
			userMock.mockResolvedValue(undefined);
			expect(
				service.updateToken({ token: 'validRefreshToken' })
			).rejects.toThrow();
		});

		it('should throw an error when password validation fails', async () => {
			const userMock = jest.spyOn(
				service['usersRepository'],
				'findUserByEmail'
			);
			userMock.mockResolvedValue(mockUser);
			const validateMock = jest.spyOn(
				service['securityService'],
				'compareValues'
			);
			validateMock.mockResolvedValue(false);
			expect(
				service.updateToken({ token: 'validRefreshToken' })
			).rejects.toThrow();
		});

		it('should throw an error when generateTokens fails', async () => {
			const userMock = jest.spyOn(
				service['usersRepository'],
				'findUserByEmail'
			);
			userMock.mockResolvedValue(mockUser);
			const validateMock = jest.spyOn(
				service['securityService'],
				'compareValues'
			);
			validateMock.mockResolvedValue(true);
			jest.spyOn(service, 'generateTokens').mockImplementation(() => {
				throw new Error('Error message');
			});
			expect(
				service.updateToken({ token: 'validRefreshToken' })
			).rejects.toThrow();
		});
	});
});
