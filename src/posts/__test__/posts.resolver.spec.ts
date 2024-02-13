import { Test, TestingModule } from '@nestjs/testing';
import { PostsResolver } from '../posts.resolver';
import { PostsService } from '../posts.service';
import { User, UserRole } from '@prisma/client';
import { PostsRepository } from '../pots.repository';
import { ErrorHandlerService } from '../../errro-catch/error-catch.service';
import { ValidateService } from '../../validate/validate.service';

describe('PostsResolver', () => {
	let resolver: PostsResolver;
	let service: PostsService;

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
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PostsResolver,
				{
					provide: PostsService,
					useValue: {
						create: jest.fn().mockResolvedValue(result),
						findOne: jest.fn().mockResolvedValue(result),
						findAll: jest.fn().mockResolvedValue([result])
					}
				},
				{
					provide: PostsRepository,
					useValue: {}
				},
				{
					provide: ErrorHandlerService,
					useValue: {}
				},
				{
					provide: ValidateService,
					useValue: {}
				}
			]
		}).compile();

		resolver = module.get<PostsResolver>(PostsResolver);
		service = module.get<PostsService>(PostsService);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});

	describe('createPost', () => {
		it('should create a post', async () => {
			const post = await resolver.createPost(createData, user);
			expect(post).toEqual(result);
		});

		it('should throw an error', async () => {
			const error = new Error('Test error');
			jest.spyOn(service, 'create').mockRejectedValueOnce(error);

			await expect(resolver.createPost(createData, user)).rejects.toThrow(
				error
			);
		});
	});

	describe('findAll', () => {
		it('should return an array of posts', async () => {
			const posts = await resolver.findAll(10, 1, 'asc');
			expect(posts).toEqual([result]);
		});

		it('should throw an error', async () => {
			const error = new Error('Test error');
			jest.spyOn(service, 'findAll').mockRejectedValueOnce(error);

			await expect(resolver.findAll(10, 1, 'asc')).rejects.toThrow(error);
		});
	});

	describe('findOne', () => {
		it('should return a post', async () => {
			const post = await resolver.findOne(1, user);
			expect(post).toEqual(result);
		});

		it('should throw an error', async () => {
			const error = new Error('Test error');
			jest.spyOn(service, 'findOne').mockRejectedValueOnce(error);

			await expect(resolver.findOne(1, user)).rejects.toThrow(error);
		});
	});
});
