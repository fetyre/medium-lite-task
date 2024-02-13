import { IPreSaveUser } from '../interface';
import { CreateUserInput } from './create-user.input';
export declare class PreSaveUserDto extends CreateUserInput implements IPreSaveUser {
    readonly uniquepassword: string;
}
