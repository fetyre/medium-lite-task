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
exports.User = void 0;
const graphql_1 = require("@nestjs/graphql");
const client_1 = require("@prisma/client");
const post_entity_1 = require("../../posts/entities/post.entity");
(0, graphql_1.registerEnumType)(client_1.UserRole, {
    name: 'UserRole'
});
let User = class User {
};
exports.User = User;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: 'Уникальный идентификатор пользователя' }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ description: 'Имя пользователя' }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ description: 'Электронная почта пользователя' }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ description: 'Пароль пользователя' }),
    __metadata("design:type", String)
], User.prototype, "uniquepassword", void 0);
__decorate([
    (0, graphql_1.Field)(() => client_1.UserRole, { description: 'Роль пользователя' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)(() => [post_entity_1.Post], { description: 'Посты созданные пользователем' }),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    (0, graphql_1.Field)(() => [post_entity_1.Post], { description: 'Посты просмотренные пользователем' }),
    __metadata("design:type", Array)
], User.prototype, "viewedPosts", void 0);
exports.User = User = __decorate([
    (0, graphql_1.ObjectType)()
], User);
//# sourceMappingURL=user.entity.js.map