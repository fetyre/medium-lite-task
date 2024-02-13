"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_resolver_1 = require("./auth.resolver");
const jwt_service_1 = require("../jwt/jwt.service");
const security_service_1 = require("../security/security.service");
const users_repository_1 = require("../users/users.repository");
const generator_service_1 = require("../generator/generator.service");
const users_service_1 = require("../users/users.service");
const validate_service_1 = require("../validate/validate.service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        providers: [
            auth_resolver_1.AuthResolver,
            auth_service_1.AuthService,
            users_repository_1.UsersRepository,
            security_service_1.SecurityService,
            jwt_service_1.JwtService,
            generator_service_1.GeneratorService,
            users_service_1.UsersService,
            validate_service_1.ValidateService
        ]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map