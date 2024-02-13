import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/decor/current-user.decorator';
import { GqlAuthGuard } from 'src/guards/jwt-graphql-access-auth.guard';
import { SortOrder } from 'src/common/global-types';

@Resolver(() => User)
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Mutation(() => User)
	@UseGuards(GqlAuthGuard)
	async createUser(
		@Args('createUserInput') createUserInput: CreateUserInput,
		@CurrentUser() user: User
	) {
		return await this.usersService.create(createUserInput, user);
	}

	@Query(() => [User], { name: 'users' })
	@UseGuards(GqlAuthGuard)
	async findAll(
		@Args('limit', { type: () => Int }) limit: number,
		@Args('offset', { type: () => Int }) offset: number,
		@Args('order', { nullable: true }) order: SortOrder,
		@CurrentUser() user: User
	) {
		return await this.usersService.findAll(limit, offset, order, user);
	}

	@Query(() => User, { name: 'user' })
	@UseGuards(GqlAuthGuard)
	findOne(
		@Args('id', { type: () => Int }) id: number,
		@CurrentUser() user: User
	) {
		return this.usersService.findOne(id, user);
	}
}
