import { Post, User } from '@prisma/client';

/**
 * @description пользователь или null.
 */
export type NullableUser = User | null;

/**
 * @description  Пользователь с его постами.
 */
export type UserWithPosts = User & {
	posts: Post[];
	viewedPosts: Post[];
};

/**
 * @description  Пользователь с его постами или null.
 */
export type UserWithPostsOrNull = UserWithPosts | null;
