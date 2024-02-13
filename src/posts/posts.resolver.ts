import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { CurrentUser } from '../decor/current-user.decorator';
import { GqlAuthGuard } from '../guards/jwt-graphql-access-auth.guard';
import { CreatePostInput } from './dto/create-post.input';
import { PostWithAuthorAndViewers } from './types/posts.types';
import { SortOrder } from '../common/global-types';

@Resolver(() => Post)
export class PostsResolver {
	constructor(private readonly postsService: PostsService) {}

	@Mutation(() => Post)
	@UseGuards(GqlAuthGuard)
	async createPost(
		@Args('createPostInput') createPostInput: CreatePostInput,
		@CurrentUser() user: User
	): Promise<PostWithAuthorAndViewers> {
		return await this.postsService.create(createPostInput, user);
	}

	@Query(() => [Post], { name: 'posts' })
	@UseGuards(GqlAuthGuard)
	async findAll(
		@Args('take') take: number,
		@Args('after', { nullable: true }) after: number,
		@Args('order', { nullable: true }) order: SortOrder
	) {
		return await this.postsService.findAll(take, after, order);
	}

	@Query(() => Post, { name: 'post' })
	@UseGuards(GqlAuthGuard)
	async findOne(
		@Args('id', { type: () => Int }) id: number,
		@CurrentUser() user: User
	) {
		return await this.postsService.findOne(id, user);
	}
}
