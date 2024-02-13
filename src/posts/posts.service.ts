import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ICreatePost } from './interface/create-post.interface';
import { User } from '@prisma/client';
import { PostsRepository } from './pots.repository';
import { ErrorHandlerService } from '../errro-catch/error-catch.service';
import {
	OptionalPostWithAuthorAndViewers,
	PostWithAuthorAndViewers
} from './types/posts.types';
import { ValidateService } from '../validate/validate.service';
import { NullableSortOrder } from '../common/global-types';

/**
 * @class PostsService
 * @description Сервис для работы с постами
 */
@Injectable()
export class PostsService {
	private readonly logger: Logger = new Logger(PostsService.name);

	constructor(
		private readonly postsRepository: PostsRepository,
		private readonly errorHandlerService: ErrorHandlerService,
		private readonly validateService: ValidateService
	) {}

	/**
	 * @method create
	 * @async
	 * @public
	 * @description Метод для создания поста
	 * @param {ICreatePost} createData - Данные для создания поста
	 * @param {User} user - Пользователь, создающий пост
	 * @returns {Promise<PostWithAuthorAndViewers>} Созданный пост с информацией об авторе и просмотрах
	 */
	public async create(
		createData: ICreatePost,
		user: User
	): Promise<PostWithAuthorAndViewers> {
		try {
			this.logger.log(`create: Starting process, userId: ${user.id}`);
			return await this.postsRepository.savePost(createData, user);
		} catch (error) {
			this.logger.error(
				`create: Error in process, userId:${user.id}, error: ${error.message}`
			);
			this.errorHandlerService.handleError(error);
		}
	}

	/**
	 * @method findAll
	 * @async
	 * @public
	 * @description Метод получения всех постов с учетом лимита, смещения и порядка сортировки
	 * @param {number} take - Количество постов для возврата
	 * @param {number | undefined} after - Идентификатор поста, после которого нужно вернуть посты
	 * @param {NullableSortOrder} order - Порядок сортировки постов
	 * @returns {Promise<PostWithAuthorAndViewers[]>} Посты с информацией об авторе и просмотрах
	 * @throws {NotFoundException} не найден пост после которого нужно вернуть пост
	 * @throws {BadRequestException} Если числа не валидные
	 */
	public async findAll(
		take: number,
		after: number | undefined,
		order: NullableSortOrder
	): Promise<PostWithAuthorAndViewers[]> {
		try {
			this.logger.log(`findAll: Starting process.`);
			this.validateService.validateNumber(take);
			await this.validatePostId(after);
			this.logger.debug(`findAll: validate post id completed.`);
			return await this.postsRepository.findManyPosts(take, after, order);
		} catch (error) {
			this.logger.error(`findOne: Error in process, error: ${error.message}`);
			this.errorHandlerService.handleError(error);
		}
	}

	/**
	 * @method validatePostId
	 * @async
	 * @private
	 * @description Метод для проверки идентификатора поста
	 * @param {number | undefined} after - Идентификатор поста для проверки
	 * @returns {Promise<void>} Ничего не возвращает
	 * @throws {NotFoundException} не найден пост после которого нужно вернуть пост
	 * @throws {BadRequestException} Если числа не валидные
	 */
	private async validatePostId(after: number | undefined): Promise<void> {
		this.logger.log(`validatePostId: Starting process.`);
		if (after) {
			this.validateService.validateNumber(after);
			return await this.getPostById(after);
		}
	}

	/**
	 * @method findOne
	 * @async
	 * @public
	 * @description Метод для поиска поста по id
	 * @param {number} id - ID поста для поиска
	 * @param {User} user - Пользователь, выполняющий запрос
	 * @throws {NotFoundException} Если нет поста по id
	 * @throws {BadRequestException} ID не валиден
	 */
	public async findOne(
		id: number,
		user: User
	): Promise<PostWithAuthorAndViewers> {
		try {
			this.logger.log(
				`findOne: Starting process, userId: ${user.id}, postId: ${id}`
			);
			this.validateService.validateNumber(id);
			await this.getPostById(id);
			this.logger.debug(
				`findOne: post find, userId: ${user.id}, postId: ${id}`
			);
			return await this.postsRepository.addViewerToPost(id, user);
		} catch (error) {
			this.logger.error(
				`findOne: Error in process, userId:${user.id}, postId:${id}, error: ${error.message}`
			);
			this.errorHandlerService.handleError(error);
		}
	}

	/**
	 * @method getPostById
	 * @async
	 * @private
	 * @description Метод для поиска поста по id
	 * @param {number} id - ID поста для поиска
	 * @returns {Promise<void>} Ничего не возвращает
	 * @throws {NotFoundException} Если нет поста
	 */
	private async getPostById(id: number): Promise<void> {
		this.logger.log(`getPostById: Starting process, postId: ${id}`);
		const post: OptionalPostWithAuthorAndViewers =
			await this.postsRepository.findPostById(id);
		this.logger.debug(
			`getPostById: User search completed, postId: ${id}, post exists:${!!post}`
		);
		this.handlePost(post);
	}

	/**
	 * @method handlePost
	 * @private
	 * @description Метод для обработки найденного поста
	 * @param {OptionalPostWithAuthorAndViewers} post - Найденный пост или null
	 * @returns {void} Ничего не возвращает
	 * @throws {NotFoundException} Если нет поста
	 */
	private handlePost(post: OptionalPostWithAuthorAndViewers): void {
		this.logger.log(`handlePost: Starting process. post exists: ${!!post}.`);
		if (!post) {
			this.logger.warn(`handlePost: Post not found.`);
			throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
		}
	}
}
