import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Post {
	@Field(() => Int, { description: 'Уникальный идентификатор поста' })
	id: number;

	@Field({ description: 'Заголовок поста' })
	title: string;

	@Field({ description: 'Содержание поста' })
	content: string;

	@Field(() => User, { description: 'Автор поста' })
	author: User;

	@Field(() => [User], { description: 'Пользователи, просмотревшие пост' })
	viewers: User[];
}
