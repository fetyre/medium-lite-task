import { ICreateUser } from './interface';
import { User } from '@prisma/client';
import { UserWithPosts } from './types/users.types';
import { UsersRepository } from './users.repository';
import { SecurityService } from '../security/security.service';
import { ValidateService } from '../validate/validate.service';
import { ErrorHandlerService } from '../errro-catch/error-catch.service';
import { NullableSortOrder } from '../common/global-types';
export declare class UsersService {
    private readonly usersRepository;
    private readonly securityService;
    private readonly validateService;
    private readonly errorHandlerService;
    private readonly logger;
    constructor(usersRepository: UsersRepository, securityService: SecurityService, validateService: ValidateService, errorHandlerService: ErrorHandlerService);
    create(createData: ICreateUser, user: User): Promise<UserWithPosts>;
    private validateUserBeforeSaving;
    private checkIfUserExistsByEmail;
    private rejectIfUserExists;
    private checkUserRole;
    findOne(id: number, user: User): Promise<UserWithPosts>;
    getUserById(id: number): Promise<UserWithPosts>;
    private handleUser;
    findAll(limit: number, offset: number, order: NullableSortOrder, user: User): Promise<UserWithPosts[]>;
}
