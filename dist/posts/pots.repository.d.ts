import { PrismaService } from '../prisma.database/prisma.service';
import { ICreatePost } from './interface/create-post.interface';
import { User } from '@prisma/client';
import { OptionalPostWithAuthorAndViewers, PostWithAuthorAndViewers } from './types/posts.types';
import { NullableSortOrder } from 'src/common/global-types';
export declare class PostsRepository {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    savePost(saveData: ICreatePost, user: User): Promise<PostWithAuthorAndViewers>;
    findPostById(id: number): Promise<OptionalPostWithAuthorAndViewers>;
    addViewerToPost(id: number, user: User): Promise<PostWithAuthorAndViewers>;
    findManyPosts(take: number, after: number | undefined, order: NullableSortOrder): Promise<PostWithAuthorAndViewers[]>;
}
