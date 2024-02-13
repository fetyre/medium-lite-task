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
var JwtService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const token_type_enum_1 = require("./models/enums/token-type.enum");
const global_const_1 = require("../common/global-const");
const generator_service_1 = require("../generator/generator.service");
const config_loader_service_1 = require("../config/config-loader.service");
let JwtService = JwtService_1 = class JwtService {
    constructor(configLoaderService, generatorService) {
        this.configLoaderService = configLoaderService;
        this.generatorService = generatorService;
        this.logger = new common_1.Logger(JwtService_1.name);
    }
    async createJwtToken(payload, secret, options) {
        this.logger.log(`createJwtToken: Starting process, userId: ${payload.id}.`);
        return jwt.sign(payload, secret, options);
    }
    async generateToken(user, tokenType) {
        this.logger.log(`generateToken: Starting process, userId: ${user.id}`);
        switch (tokenType) {
            case token_type_enum_1.TokenTypeEnum.ACCESS:
                return await this.generateAccessToken(user);
            case token_type_enum_1.TokenTypeEnum.REFRESH:
                return await this.generateRefreshToken(user);
            default:
                this.logger.error(`generateToken: Unsupported token type: ${tokenType}, userId: ${user.id}`);
                throw new common_1.HttpException(`Неподдерживаемый тип токена: ${tokenType}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async generateAccessToken(user) {
        this.logger.log(`generateAccessToken: Starting process, userId: ${user.id}`);
        const { privateKey: accessSecret, time: accessTime } = this.configLoaderService.jwtConfig.access;
        const jwtid = this.generatorService.generateUuid();
        this.logger.debug(`generateAccessToken: Generated completed.`);
        return await this.createJwtToken({ id: user.id, role: user.role }, accessSecret, {
            issuer: this.configLoaderService.issuer,
            audience: this.configLoaderService.domain,
            algorithm: global_const_1.JWT_ALGORITHM,
            expiresIn: accessTime,
            jwtid
        });
    }
    async generateRefreshToken(user) {
        this.logger.log(`generateRefreshToken: Starting process, userId: ${user.id}`);
        const { privateKey: refreshSecret, time: refreshTime } = this.configLoaderService.jwtConfig.refresh;
        const jwtid = this.generatorService.generateUuid();
        this.logger.debug(`generateAccessToken: Generated completed.`);
        return await this.createJwtToken({
            id: user.id,
            role: user.role
        }, refreshSecret, {
            issuer: this.configLoaderService.issuer,
            audience: this.configLoaderService.domain,
            algorithm: global_const_1.JWT_ALGORITHM,
            expiresIn: refreshTime,
            jwtid
        });
    }
    async verifyRefreshToken(token) {
        this.logger.log(`verifyRefreshToken: Starting process.`);
        const { publicKey, time: accessTime } = this.configLoaderService.jwtConfig.refresh;
        const jwtOptions = this.createJwtOptions();
        return await this.verifyTokenAsync(token, publicKey, jwtOptions, accessTime);
    }
    createJwtOptions() {
        this.logger.log(`createJwtOptions: Starting process.`);
        return {
            issuer: this.configLoaderService.issuer,
            audience: new RegExp(this.configLoaderService.domain)
        };
    }
    async verifyTokenAsync(token, publicKey, jwtOptions, time) {
        this.logger.log(`verifyTokenAsync: Starting process.`);
        return new Promise((resolve, reject) => {
            jwt.verify(token, publicKey, { ...jwtOptions, maxAge: time }, (error, payload) => {
                if (error) {
                    this.logger.warn(`verifyTokenAsync: Error verifying token, error: ${error.message}`);
                    reject(error);
                    return;
                }
                this.logger.log(`verifyTokenAsync: Token verified successfully, userId:${payload.id}.`);
                resolve(payload);
            });
        });
    }
};
exports.JwtService = JwtService;
exports.JwtService = JwtService = JwtService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_loader_service_1.ConfigLoaderService,
        generator_service_1.GeneratorService])
], JwtService);
//# sourceMappingURL=jwt.service.js.map