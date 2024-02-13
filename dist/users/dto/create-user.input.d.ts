import { UserRole } from '@prisma/client';
import { ICreateUser } from '../interface';
import { SignInInput } from '../../auth/dto/sing-in.input';
export declare class CreateUserInput extends SignInInput implements ICreateUser {
    readonly name: string;
    readonly role: UserRole;
}
