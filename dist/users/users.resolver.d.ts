import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { SortOrder } from 'src/common/global-types';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserInput: CreateUserInput, user: User): Promise<import("./types/users.types").UserWithPosts>;
    findAll(limit: number, offset: number, order: SortOrder, user: User): Promise<import("./types/users.types").UserWithPosts[]>;
    findOne(id: number, user: User): Promise<import("./types/users.types").UserWithPosts>;
}
