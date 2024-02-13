import { User } from '@prisma/client';
import { ITokens } from './tokens.interface';

/**
 * @interface IAuth
 * @description Интерфейс аутентификации пользователя
 * @property {User} user - Аутентифицированный пользователь
 * @property {ITokens} token - Токены пользователя
 */
export interface IAuth {
	user: User;
	token: ITokens;
}
