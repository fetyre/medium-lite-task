import { PostsService } from './posts.service';
import { User } from '@prisma/client';
import { CreatePostInput } from './dto/create-post.input';
import { PostWithAuthorAndViewers } from './types/posts.types';
import { SortOrder } from '../common/global-types';
export declare class PostsResolver {
    private readonly postsService;
    constructor(postsService: PostsService);
    createPost(createPostInput: CreatePostInput, user: User): Promise<PostWithAuthorAndViewers>;
    findAll(take: number, after: number, order: SortOrder): Promise<PostWithAuthorAndViewers[]>;
    findOne(id: number, user: User): Promise<PostWithAuthorAndViewers>;
}
