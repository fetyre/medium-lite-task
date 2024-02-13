import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';
import { Post } from '../../posts/entities/post.entity';

registerEnumType(UserRole, {
	name: 'UserRole'
});

@ObjectType()
export class User {
	@Field(() => Int, { description: 'Уникальный идентификатор пользователя' })
	id: number;

	@Field({ description: 'Имя пользователя' })
	name: string;

	@Field({ description: 'Электронная почта пользователя' })
	email: string;

	@Field({ description: 'Пароль пользователя' })
	uniquepassword: string;

	@Field(() => UserRole, { description: 'Роль пользователя' })
	role: UserRole;

	@Field(() => [Post], { description: 'Посты созданные пользователем' })
	posts: Post[];

	@Field(() => [Post], { description: 'Посты просмотренные пользователем' })
	viewedPosts: Post[];
}
