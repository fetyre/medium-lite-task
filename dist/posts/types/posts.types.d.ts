import { Post, User } from '@prisma/client';
export type PostWithAuthorAndViewers = Post & {
    author: User;
    viewers: User[];
};
export type OptionalPostWithAuthorAndViewers = PostWithAuthorAndViewers | null;
