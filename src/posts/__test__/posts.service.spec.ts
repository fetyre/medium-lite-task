import { Test, TestingModule } from '@nestjs/testing';
import { ErrorHandlerService } from '../../errro-catch/error-catch.service';
import { ValidateService } from '../..//validate/validate.service';
import { PostsService } from '../posts.service';
import { PostsRepository } from '../pots.repository';
import { User, UserRole } from '@prisma/client';
import { HttpException } from '@nestjs/common';

describe('PostsService', () => {
	let service: PostsService;
	let postsRepo: any;
	let errorHandler: any;
	let validateService: any;

	const user: User = {
		id: 1,
		name: 'User',
		email: 'example@bk.ru',
		uniquepassword: 'Password123',
		role: UserRole.user
	};
	const result = {
		id: 1,
		title: 'Test Post',
		content: 'Test Content',
		authorId: 1,
		author: user,
		viewers: []
	};
	const createData = { title: 'Test Post', content: 'Test Content' };

	beforeEach(async () => {
		const repoMock = {
			savePost: jest.fn(),
			findPostById: jest.fn(),
			addViewerToPost: jest.fn(),
			findManyPosts: jest.fn()
		};
		const errorHandlerMock = {
			handleError: jest.fn().mockImplementation(error => {
				throw error;
			})
		};

		const validateServiceMock = {
			validateNumber: jest.fn()
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PostsService,
				{ provide: PostsRepository, useValue: repoMock },
				{ provide: ErrorHandlerService, useValue: errorHandlerMock },
				{ provide: ValidateService, useValue: validateServiceMock }
			]
		}).compile();

		service = module.get<PostsService>(PostsService);
		postsRepo = module.get<any>(PostsRepository);
		errorHandler = module.get<any>(ErrorHandlerService);
		validateService = module.get<any>(ValidateService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('create', () => {
		it('should create a post', async () => {
			postsRepo.savePost.mockResolvedValueOnce(result);

			expect(await service.create(createData, user)).toEqual(result);
			expect(postsRepo.savePost).toHaveBeenCalledWith(createData, user);
		});
	});

	describe('findAll', () => {
		it('should return an array of posts', async () => {
			const res = [result];
			postsRepo.findManyPosts.mockResolvedValueOnce(res);
			postsRepo.findPostById.mockResolvedValueOnce(result);
			expect(await service.findAll(10, 1, 'asc')).toEqual(res);
		});

		it('should throw an error if validation fails', async () => {
			validateService.validateNumber.mockResolvedValueOnce(new Error());
			await expect(service.findAll(10, 1, 'asc')).rejects.toThrow(
				HttpException
			);
		});

		it('should throw an error if post is not found', async () => {
			postsRepo.findPostById.mockResolvedValueOnce(undefined);
			await expect(service.findAll(10, 1, 'asc')).rejects.toThrow(
				HttpException
			);
		});
	});

	describe('findOne', () => {
		it('should return a post', async () => {
			postsRepo.findPostById.mockResolvedValueOnce(result);
			postsRepo.addViewerToPost.mockResolvedValueOnce(result);
			expect(await service.findOne(1, user)).toEqual(result);
		});

		it('should throw an error if post is not found', async () => {
			postsRepo.findPostById.mockResolvedValueOnce(undefined);
			await expect(service.findOne(1, user)).rejects.toThrow(HttpException);
		});

		it('should throw an error if validation fails', async () => {
			validateService.validateNumber.mockResolvedValueOnce(new Error());
			await expect(service.findOne(1, user)).rejects.toThrow(HttpException);
		});
	});
});
