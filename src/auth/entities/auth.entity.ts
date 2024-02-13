import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { AuthToken } from './auth-tokens.entity';
import { IAuth } from '../interface/auth.inerface';

@ObjectType()
export class Auth implements IAuth {
	@Field(() => User, { description: 'Аутентифицированный пользователь' })
	user: User;

	@Field(() => AuthToken, { description: 'Токены пользователя' })
	token: AuthToken;
}
