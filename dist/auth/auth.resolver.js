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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const auth_service_1 = require("./auth.service");
const auth_entity_1 = require("./entities/auth.entity");
const sing_in_input_1 = require("./dto/sing-in.input");
const update_token_input_1 = require("./dto/update-token.input");
let AuthResolver = class AuthResolver {
    constructor(authService) {
        this.authService = authService;
    }
    async signIn(signInData) {
        return await this.authService.signIn(signInData);
    }
    async updateToken(updateData) {
        return await this.authService.updateToken(updateData);
    }
};
exports.AuthResolver = AuthResolver;
__decorate([
    (0, graphql_1.Mutation)(() => auth_entity_1.Auth),
    __param(0, (0, graphql_1.Args)('signInInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sing_in_input_1.SignInInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "signIn", null);
__decorate([
    (0, graphql_1.Mutation)(() => auth_entity_1.Auth),
    __param(0, (0, graphql_1.Args)('updateToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_token_input_1.UpdateTokenInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "updateToken", null);
exports.AuthResolver = AuthResolver = __decorate([
    (0, graphql_1.Resolver)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
//# sourceMappingURL=auth.resolver.js.map