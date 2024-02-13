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
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const users_repository_1 = require("./users.repository");
const security_service_1 = require("../security/security.service");
const dto_1 = require("./dto");
const validate_service_1 = require("../validate/validate.service");
const error_catch_service_1 = require("../errro-catch/error-catch.service");
let UsersService = UsersService_1 = class UsersService {
    constructor(usersRepository, securityService, validateService, errorHandlerService) {
        this.usersRepository = usersRepository;
        this.securityService = securityService;
        this.validateService = validateService;
        this.errorHandlerService = errorHandlerService;
        this.logger = new common_1.Logger(UsersService_1.name);
    }
    async create(createData, user) {
        try {
            this.logger.log(`create: Starting process, userId:${user.id}, email:${createData.email}`);
            this.checkUserRole(user);
            this.logger.debug(`create: User role checked, userId:${user.id}`);
            await this.checkIfUserExistsByEmail(createData.email);
            this.logger.debug(`create: Email verified, userId:${user.id}, email:${createData.email}`);
            createData.uniquepassword = await this.securityService.hashPassword(createData.uniquepassword);
            this.logger.debug(`create: Password hashed, userId:${user.id}`);
            await this.validateUserBeforeSaving(createData);
            this.logger.debug(`create: User validated before saving, userId:${user.id}, email:${createData.email}`);
            return await this.usersRepository.saveUser(createData);
        }
        catch (error) {
            this.logger.error(`create: Error in process, userId:${user.id}, email:${createData.email}, error:${error.message}`);
            this.errorHandlerService.handleError(error);
        }
    }
    async validateUserBeforeSaving(createData) {
        this.logger.log(`Starting validateUserBeforeSaving, email:${createData.email}`);
        const validateObj = {
            ...createData
        };
        return this.validateService.validateDto(dto_1.PreSaveUserDto, validateObj);
    }
    async checkIfUserExistsByEmail(email) {
        this.logger.log(`checkIfUserExistsByEmail: Starting process, email: ${email}`);
        const user = await this.usersRepository.findUserByEmail(email);
        this.logger.debug(`checkIfUserExistsByEmail: User search completed. email: ${email}, user exists:${!!user}`);
        this.rejectIfUserExists(user);
    }
    rejectIfUserExists(user) {
        this.logger.log(`rejectIfUserExists: Starting process. user exists: ${!!user}.`);
        if (user) {
            this.logger.warn(`rejectIfUserExists: User found. Registration denied, email:${user.email}.`);
            throw new common_1.HttpException('Email is already in use', common_1.HttpStatus.CONFLICT);
        }
    }
    checkUserRole(user) {
        this.logger.log(`checkUserRole: Starting process, userId: ${user.id}.`);
        if (user.role !== client_1.UserRole.admin) {
            this.logger.warn(`Unauthorized access attempt by user, userId: ${user.id}.`);
            throw new common_1.HttpException('Unauthorized access', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async findOne(id, user) {
        try {
            this.logger.log(`findOne: Starting process, userId:${user.id}.`);
            this.checkUserRole(user);
            this.logger.debug(`findOne: User role checked, userId:${user.id}`);
            this.validateService.validateNumber(id);
            return this.getUserById(id);
        }
        catch (error) {
            this.logger.error(`findOne: Error in process, userId:${user.id}, error:${error.message}.`);
            this.errorHandlerService.handleError(error);
        }
    }
    async getUserById(id) {
        this.logger.log(`getUserById: Starting process, userId: ${id}`);
        const user = await this.usersRepository.findUserById(id);
        this.logger.debug(`getUserById: User search completed, userId: ${id}, user exists:${!!user}`);
        this.handleUser(user);
        return user;
    }
    handleUser(user) {
        this.logger.log(`handleUser: Starting process. user exists: ${!!user}.`);
        if (!user) {
            this.logger.warn(`handleUser: User not found.`);
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async findAll(limit, offset, order, user) {
        try {
            this.logger.log(`findAll: Starting process, userId:${user.id}.`);
            this.checkUserRole(user);
            this.logger.debug(`findOne: User role checked, userId:${user.id}`);
            this.validateService.validateNumber(limit);
            this.validateService.validateNumber(offset);
            return await this.usersRepository.findManyUsers(limit, offset, order);
        }
        catch (error) {
            this.logger.error(`findOne: Error in process, userId:${user.id}, error:${error.message}.`);
            this.errorHandlerService.handleError(error);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        security_service_1.SecurityService,
        validate_service_1.ValidateService,
        error_catch_service_1.ErrorHandlerService])
], UsersService);
//# sourceMappingURL=users.service.js.map