import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.database/prisma.service';
import {
	NullableUser,
	UserWithPosts,
	UserWithPostsOrNull
} from './types/users.types';
import { ICreateUser } from './interface';
import { NullableSortOrder } from '../common/global-types';

@Injectable()
export class UsersRepository {
	private readonly logger: Logger = new Logger(UsersRepository.name);

	constructor(private readonly prisma: PrismaService) {}

	/**
	 * @method findUserByEmail
	 * @public
	 * @async
	 * @description Поиск пользователя по email
	 * @param {string} email - email пользователя
	 * @returns {Promise<NullableUser>} Найденный пользователь или null
	 */
	public async findUserByEmail(email: string): Promise<UserWithPostsOrNull> {
		this.logger.log(`findUserByEmail: Starting process. email: ${email}`);
		return await this.prisma.user.findUnique({
			where: { email },
			include: {
				posts: true,
				viewedPosts: true
			}
		});
	}

	/**
	 * @method saveUser
	 * @public
	 * @async
	 * @description Сохранение пользователя в бд
	 * @param {ICreateUser} createData - сохраняеммые даныне
	 * @returns {Promise<UserWithPosts>} Сохраненный пользователь, с постами
	 */
	public async saveUser(createData: ICreateUser): Promise<UserWithPosts> {
		this.logger.log(`saveUser: Starting process, email:${createData.email}.`);
		return await this.prisma.user.create({
			data: { ...createData },
			include: {
				posts: true,
				viewedPosts: true
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
	public async findUserById(id: number): Promise<UserWithPostsOrNull> {
		this.logger.log(`findUserById: Starting process. userId: ${id}`);
		return await this.prisma.user.findUnique({
			where: { id },
			include: {
				posts: true,
				viewedPosts: true
			}
		});
	}

	/**
	 * @method findUserWithoutPostsById
	 * @public
	 * @async
	 * @description Поиск пользователя по id
	 * @param {number} id - ID пользователя для поиска
	 * @returns {Promise<NullableUser>} Найденный пользователь или null
	 */
	public async findUserWithoutPostsById(id: number): Promise<NullableUser> {
		this.logger.log(
			`findUserWithoutPostsById: Starting process. userId: ${id}`
		);
		return await this.prisma.user.findUnique({
			where: { id }
		});
	}

	/**
	 * @method findManyUsers
	 * @public
	 * @async
	 * @description Поиск пользователя по id
	 * @param {number} limit - количество получаемых пользователей
	 * @param {number} offset - кол-во пропускаемых пользователей
	 * @param {NullableSortOrder} order - формат сортировки
	 * @returns {Promise<UserWithPosts[]>} - массив пользователей с их постами.
	 */
	public async findManyUsers(
		limit: number,
		offset: number,
		order: NullableSortOrder
	): Promise<UserWithPosts[]> {
		this.logger.log(`findManyUsers: Starting process.`);
		return await this.prisma.user.findMany({
			skip: offset,
			take: limit,
			orderBy: { id: order || 'asc' },
			include: {
				posts: true,
				viewedPosts: true
			}
		});
	}
}
