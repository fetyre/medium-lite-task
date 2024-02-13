"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var StrategyService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategyService = void 0;
const common_1 = require("@nestjs/common");
const validate_service_1 = require("../validate/validate.service");
const users_repository_1 = require("../users/users.repository");
const confirmation_strategy_dto_1 = require("./dto/confirmation-strategy.dto");
let StrategyService = StrategyService_1 = class StrategyService {
    constructor(validateService, usersRepository) {
        this.validateService = validateService;
        this.usersRepository = usersRepository;
        this.logger = new common_1.Logger(StrategyService_1.name);
    }
    async validatePayload(payload) {
        this.logger.log(`validatePayload: Starting process, userId:${payload.id}.`);
        const value = {
            id: payload.id,
            jti: payload.jti,
            role: payload.role
        };
        await this.validateService.validateDto(confirmation_strategy_dto_1.ValidateConfirmPayload, value);
        this.logger.debug(`validatePayload: Payload validated. userId: ${value.id}`);
        return value;
    }
    async checkAndFindUserById(id) {
        this.logger.log(`checkAndFindUserById: Starting process, userId: ${id}.`);
        const user = await this.usersRepository.findUserWithoutPostsById(id);
        this.logger.debug(`getUserById: User search completed, userId: ${id}, user exists:${!!user}`);
        this.checkUser(user);
        return user;
    }
    checkUser(user) {
        this.logger.log(`checkUser: Starting process. user exists: ${!!user}.`);
        if (!user) {
            this.logger.warn(`checkUser: User not found.`);
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    checkRoleUser(userRole, requiredRole) {
        this.logger.log(`checkRoleUser: Starting process, userRole:${userRole}, requiredRole:${requiredRole}.`);
        if (userRole !== requiredRole) {
            throw new common_1.HttpException('Ошибка доступа', common_1.HttpStatus.FORBIDDEN);
        }
    }
};
exports.StrategyService = StrategyService;
exports.StrategyService = StrategyService = StrategyService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [validate_service_1.ValidateService,
        users_repository_1.UsersRepository])
], StrategyService);
//# sourceMappingURL=strategy.service.js.map