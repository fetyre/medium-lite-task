import { PrismaService } from '../prisma.database/prisma.service';
import { NullableUser, UserWithPosts, UserWithPostsOrNull } from './types/users.types';
import { ICreateUser } from './interface';
import { NullableSortOrder } from '../common/global-types';
export declare class UsersRepository {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    findUserByEmail(email: string): Promise<UserWithPostsOrNull>;
    saveUser(createData: ICreateUser): Promise<UserWithPosts>;
    findUserById(id: number): Promise<UserWithPostsOrNull>;
    findUserWithoutPostsById(id: number): Promise<NullableUser>;
    findManyUsers(limit: number, offset: number, order: NullableSortOrder): Promise<UserWithPosts[]>;
}
