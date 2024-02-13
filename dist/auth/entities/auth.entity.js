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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("../../users/entities/user.entity");
const auth_tokens_entity_1 = require("./auth-tokens.entity");
let Auth = class Auth {
};
exports.Auth = Auth;
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User, { description: 'Аутентифицированный пользователь' }),
    __metadata("design:type", user_entity_1.User)
], Auth.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => auth_tokens_entity_1.AuthToken, { description: 'Токены пользователя' }),
    __metadata("design:type", auth_tokens_entity_1.AuthToken)
], Auth.prototype, "token", void 0);
exports.Auth = Auth = __decorate([
    (0, graphql_1.ObjectType)()
], Auth);
//# sourceMappingURL=auth.entity.js.map