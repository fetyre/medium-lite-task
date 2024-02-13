import { Post, User } from '@prisma/client';
export type NullableUser = User | null;
export type UserWithPosts = User & {
    posts: Post[];
    viewedPosts: Post[];
};
export type UserWithPostsOrNull = UserWithPosts | null;
