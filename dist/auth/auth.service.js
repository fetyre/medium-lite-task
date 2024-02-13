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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("../users/users.repository");
const security_service_1 = require("../security/security.service");
const token_type_enum_1 = require("../jwt/models/enums/token-type.enum");
const jwt_service_1 = require("../jwt/jwt.service");
const error_catch_service_1 = require("../errro-catch/error-catch.service");
const users_service_1 = require("../users/users.service");
const ACCESS_INDEX = 0;
const REFRESH_INDEX = 1;
let AuthService = AuthService_1 = class AuthService {
    constructor(usersRepository, securityService, jwtService, errorHandlerService, usersService) {
        this.usersRepository = usersRepository;
        this.securityService = securityService;
        this.jwtService = jwtService;
        this.errorHandlerService = errorHandlerService;
        this.usersService = usersService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async signIn(data) {
        try {
            this.logger.log(`signIn: Starting process, email: ${data.email}`);
            const userWitnPosts = await this.fetchUserByEmail(data.email);
            this.logger.debug(`signIn: User found, userId: ${userWitnPosts.id}, email: ${userWitnPosts.email}`);
            const { posts, viewedPosts, ...user } = userWitnPosts;
            await this.validatePassword(user, data.uniquepassword);
            this.logger.debug(`signIn: password valid, userId: ${user.id}, email: ${user.email}`);
            const token = await this.generateTokens(user);
            return { user: userWitnPosts, token };
        }
        catch (error) {
            this.logger.error(`signIn: Error in process, email: ${data.email}, error:${error.message}`);
            this.errorHandlerService.handleError(error);
        }
    }
    async generateTokens(user) {
        this.logger.log(`generateTokens: Starting process, userId:${user.id}`);
        const tokens = await Promise.all([
            this.jwtService.generateToken(user, token_type_enum_1.TokenTypeEnum.ACCESS),
            this.jwtService.generateToken(user, token_type_enum_1.TokenTypeEnum.REFRESH)
        ]);
        this.logger.debug(`generateTokens: Tokens generated, userId:${user.id}`);
        return {
            accessToken: tokens[ACCESS_INDEX],
            refreshToken: tokens[REFRESH_INDEX]
        };
    }
    async fetchUserByEmail(email) {
        this.logger.log(`fetchUserByEmail: Starting process, email: ${email}`);
        const user = await this.usersRepository.findUserByEmail(email);
        this.logger.debug(`fetchUserByEmail: User search completed. email: ${email}, user exists:${!!user}`);
        this.validateUserExistence(user);
        return user;
    }
    validateUserExistence(user) {
        this.logger.log(`validateUserExistence: Starting process, user exists: ${!!user}.`);
        if (!user) {
            this.logger.warn(`validateUserExistence: User not found, user exists: ${!!user}.`);
            throw new common_1.HttpException('Неверный пароль или почта', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async validatePassword(user, uniquepassword) {
        this.logger.log(`validatePassword: Starting process, userId: ${user.id}`);
        const isValidPassword = await this.securityService.compareValues(user.uniquepassword, uniquepassword);
        this.logger.debug(`validatePassword: Verification result: ${isValidPassword}`);
        this.checkValidatePassword(isValidPassword);
        return isValidPassword;
    }
    checkValidatePassword(isValid) {
        this.logger.log(`checkValidatePassword: Starting process, validate exists: ${isValid}`);
        if (!isValid) {
            this.logger.warn(`checkValidatePassword: Validation failed, isValid: ${isValid}`);
            throw new common_1.HttpException('Неверный пароль или почта', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async updateToken(updateData) {
        try {
            this.logger.log(`updateToken: Starting process.`);
            const payload = await this.jwtService.verifyRefreshToken(updateData.token);
            this.logger.debug(`updateToken: Token valid, userId:${payload.id}.`);
            const user = await this.usersService.getUserById(payload.id);
            this.logger.debug(`updateToken: User found, userId:${payload.id}.`);
            const accessToken = await this.jwtService.generateToken(user, token_type_enum_1.TokenTypeEnum.ACCESS);
            this.logger.log(`updateToken: Access token successfully generated. userId: ${user.id}`);
            return { user, token: { accessToken, refreshToken: updateData.token } };
        }
        catch (error) {
            this.logger.error(`updateToken: Error in process. error: ${error.message}`);
            this.errorHandlerService.handleError(error);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        security_service_1.SecurityService,
        jwt_service_1.JwtService,
        error_catch_service_1.ErrorHandlerService,
        users_service_1.UsersService])
], AuthService);
//# sourceMappingURL=auth.service.js.map