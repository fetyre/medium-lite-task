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
var JwtAccessStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAccessStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const strategy_service_1 = require("../strategy.service");
const error_catch_service_1 = require("../../errro-catch/error-catch.service");
const global_const_1 = require("../../common/global-const");
const config_loader_service_1 = require("../../config/config-loader.service");
let JwtAccessStrategy = JwtAccessStrategy_1 = class JwtAccessStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwtAccessStrategy') {
    constructor(configLoaderService, strategyService, errorHandlerService) {
        const domain = configLoaderService.domain;
        const issuer = configLoaderService.issuer;
        const { publicKey } = configLoaderService.jwtConfig.access;
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            algorithms: [global_const_1.JWT_ALGORITHM],
            secretOrKey: publicKey,
            audience: domain,
            issuer: issuer
        });
        this.configLoaderService = configLoaderService;
        this.strategyService = strategyService;
        this.errorHandlerService = errorHandlerService;
        this.logger = new common_1.Logger(JwtAccessStrategy_1.name);
    }
    async validate(payload, done) {
        try {
            this.logger.log(`validate: Starting process, userId:${payload.id}.`);
            const value = await this.strategyService.validatePayload(payload);
            this.logger.debug(`validate: Payload validated. userId: ${value.id}`);
            const user = await this.strategyService.checkAndFindUserById(value.id);
            this.logger.log(`validate: User found. userId: ${user.id}`);
            done(null, { user });
        }
        catch (error) {
            this.logger.error(`validate: Error in process. error: ${error.message}`);
            this.errorHandlerService.handleError(error);
        }
    }
};
exports.JwtAccessStrategy = JwtAccessStrategy;
exports.JwtAccessStrategy = JwtAccessStrategy = JwtAccessStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_loader_service_1.ConfigLoaderService,
        strategy_service_1.StrategyService,
        error_catch_service_1.ErrorHandlerService])
], JwtAccessStrategy);
//# sourceMappingURL=jwt-access.strategy.js.map