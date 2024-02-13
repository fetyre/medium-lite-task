import { UsersRepository } from '../users/users.repository';
import { User } from '@prisma/client';
import { SecurityService } from '../security/security.service';
import { IAuth, ISignIn, ITokens, IUpdateToken } from './interface';
import { JwtService } from '../jwt/jwt.service';
import { ErrorHandlerService } from '../errro-catch/error-catch.service';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly usersRepository;
    private readonly securityService;
    private readonly jwtService;
    private readonly errorHandlerService;
    private readonly usersService;
    private readonly logger;
    constructor(usersRepository: UsersRepository, securityService: SecurityService, jwtService: JwtService, errorHandlerService: ErrorHandlerService, usersService: UsersService);
    signIn(data: ISignIn): Promise<IAuth>;
    generateTokens(user: User): Promise<ITokens>;
    private fetchUserByEmail;
    private validateUserExistence;
    private validatePassword;
    private checkValidatePassword;
    updateToken(updateData: IUpdateToken): Promise<IAuth>;
}
