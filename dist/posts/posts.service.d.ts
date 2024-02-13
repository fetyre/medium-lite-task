import { ICreatePost } from './interface/create-post.interface';
import { User } from '@prisma/client';
import { PostsRepository } from './pots.repository';
import { ErrorHandlerService } from '../errro-catch/error-catch.service';
import { PostWithAuthorAndViewers } from './types/posts.types';
import { ValidateService } from '../validate/validate.service';
import { NullableSortOrder } from '../common/global-types';
export declare class PostsService {
    private readonly postsRepository;
    private readonly errorHandlerService;
    private readonly validateService;
    private readonly logger;
    constructor(postsRepository: PostsRepository, errorHandlerService: ErrorHandlerService, validateService: ValidateService);
    create(createData: ICreatePost, user: User): Promise<PostWithAuthorAndViewers>;
    findAll(take: number, after: number | undefined, order: NullableSortOrder): Promise<PostWithAuthorAndViewers[]>;
    private validatePostId;
    findOne(id: number, user: User): Promise<PostWithAuthorAndViewers>;
    private getPostById;
    private handlePost;
}
