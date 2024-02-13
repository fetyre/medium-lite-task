import { User } from '@prisma/client';
import { ITokens } from './tokens.interface';
export interface IAuth {
    user: User;
    token: ITokens;
}
