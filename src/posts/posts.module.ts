import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { PostsRepository } from './pots.repository';
import { ValidateService } from '../validate/validate.service';

@Module({
	providers: [PostsResolver, PostsService, PostsRepository, ValidateService]
})
export class PostsModule {}
