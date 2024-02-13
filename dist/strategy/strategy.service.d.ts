import { ValidateService } from 'src/validate/validate.service';
import { ConfirmPayload } from './interface/confirm-stategy.interface';
import { User, UserRole } from '@prisma/client';
import { UsersRepository } from 'src/users/users.repository';
export declare class StrategyService {
    private readonly validateService;
    private readonly usersRepository;
    private readonly logger;
    constructor(validateService: ValidateService, usersRepository: UsersRepository);
    validatePayload(payload: ConfirmPayload): Promise<ConfirmPayload>;
    checkAndFindUserById(id: number): Promise<User>;
    private checkUser;
    checkRoleUser(userRole: string, requiredRole: UserRole): void;
}
