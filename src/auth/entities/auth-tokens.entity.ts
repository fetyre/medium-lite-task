import { ObjectType, Field } from '@nestjs/graphql';
import { ITokens } from '../interface';

@ObjectType()
export class AuthToken implements ITokens {
	@Field(() => String, { description: 'Токен доступа пользователя' })
	accessToken: string;

	@Field(() => String, { description: 'Токен обновления пользователя' })
	refreshToken: string;
}
