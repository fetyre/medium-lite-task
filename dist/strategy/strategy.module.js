"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategyModule = void 0;
const common_1 = require("@nestjs/common");
const validate_service_1 = require("../validate/validate.service");
const users_repository_1 = require("../users/users.repository");
const jwt_access_strategy_1 = require("./strategies/jwt-access.strategy");
const strategy_service_1 = require("./strategy.service");
let StrategyModule = class StrategyModule {
};
exports.StrategyModule = StrategyModule;
exports.StrategyModule = StrategyModule = __decorate([
    (0, common_1.Module)({
        providers: [
            strategy_service_1.StrategyService,
            validate_service_1.ValidateService,
            users_repository_1.UsersRepository,
            jwt_access_strategy_1.JwtAccessStrategy
        ]
    })
], StrategyModule);
//# sourceMappingURL=strategy.module.js.map