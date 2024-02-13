import { User } from '../../users/entities/user.entity';
import { AuthToken } from './auth-tokens.entity';
import { IAuth } from '../interface/auth.inerface';
export declare class Auth implements IAuth {
    user: User;
    token: AuthToken;
}
