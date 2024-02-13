import { UserRole } from '@prisma/client';
import { ISignIn } from '../../auth/interface';
export interface ICreateUser extends ISignIn {
    readonly name: string;
    readonly role: UserRole;
}
