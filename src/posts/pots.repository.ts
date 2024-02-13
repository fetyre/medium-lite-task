import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.database/prisma.service';
import { ICreatePost } from './interface/create-post.interface';
import { User } from '@prisma/client';
import {
	OptionalPostWithAuthorAndViewers,
	PostWithAuthorAndViewers
} from './types/posts.types';
import { NullableSortOrder } from 'src/common/global-types';

const SKIP_COUNT: number = 1;

@Injectable()
export class PostsRepository {
	private readonly logger: Logger = new Logger(PostsRepository.name);

	constructor(private readonly prisma: PrismaService) {}

	public async savePost(
		saveData: ICreatePost,
		user: User
	): Promise<PostWithAuthorAndViewers> {
		this.logger.log(`savePost: Starting process, userId: ${user.id}.`);
		return await this.prisma.post.create({
			data: { ...saveData, authorId: user.id },
			include: {
				author: true,
				viewers: true
			}
		});
	}

	/**
	 * @method findUserById
	 * @public
	 * @async
	 * @description Поиск пользователя по id
	 * @param {number} id - ID пользователя для поиска
	 * @returns {Promise<UserWithPostsOrNull>} Найденный пользователь или null
	 */
	public async findPostById(
		id: number
	): Promise<OptionalPostWithAuthorAndViewers> {
		this.logger.log(`findPostById: Starting process, postId: ${id}.`);
		return await this.prisma.post.findUnique({
			where: { id },
			include: {
				author: true,
				viewers: true
			}
		});
	}

	public async addViewerToPost(
		id: number,
		user: User
	): Promise<PostWithAuthorAndViewers> {
		this.logger.log(`addViewerToPost: Starting process, postId: ${id}.`);
		return await this.prisma.post.update({
			where: { id },
			data: {
				viewers: {
					connect: {
						id: user.id
					}
				}
			},
			include: {
				author: true,
				viewers: true
			}
		});
	}

	public async findManyPosts(
		take: number,
		after: number | undefined,
		order: NullableSortOrder
	): Promise<PostWithAuthorAndViewers[]> {
		this.logger.log(`addViewerToPost: Starting process.`);
		return this.prisma.post.findMany({
			take,
			skip: after ? SKIP_COUNT : undefined,
			cursor: after ? { id: after } : undefined,
			orderBy: { id: order || 'asc' },
			include: {
				author: true,
				viewers: true
			}
		});
	}
}
