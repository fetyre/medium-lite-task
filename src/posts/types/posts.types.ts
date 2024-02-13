import { Post, User } from '@prisma/client';

/**
 * @description  пост с автором и просмотрщиками
 */
export type PostWithAuthorAndViewers = Post & { author: User; viewers: User[] };

/**
 * @description  либо пост с автором и просмотрщиками, либо null
 */
export type OptionalPostWithAuthorAndViewers = PostWithAuthorAndViewers | null;
