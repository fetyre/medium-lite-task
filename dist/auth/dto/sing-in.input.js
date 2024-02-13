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
exports.SignInInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const PASSWORD_REGEX = /^(?=.*[a-zA-Zа-яА-Я])(?=.*\d)\S{8,}$/;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 35;
let SignInInput = class SignInInput {
};
exports.SignInInput = SignInInput;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Электронная почта пользователя' }),
    (0, graphql_1.Field)({ description: 'Электронная почта пользователя' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email не может быть пустым' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Недействительный формат email' }),
    (0, class_transformer_1.Transform)(params => params.value.toLowerCase().trim()),
    __metadata("design:type", String)
], SignInInput.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Пароль пользователя' }),
    (0, graphql_1.Field)({ description: 'Пароль пользователя' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Пароль не может быть пустым' }),
    (0, class_validator_1.IsString)({ message: 'Пароль должен быть строкой' }),
    (0, class_validator_1.MinLength)(MIN_PASSWORD_LENGTH, {
        message: `Пароль должен содержать не менее ${MIN_PASSWORD_LENGTH} символов`
    }),
    (0, class_validator_1.MaxLength)(MAX_PASSWORD_LENGTH, {
        message: `Пароль должен содержать не более ${MAX_PASSWORD_LENGTH} символов`
    }),
    (0, class_validator_1.Matches)(PASSWORD_REGEX, {
        message: 'Пароль должен содержать хотя бы одну букву и одну цифру'
    }),
    (0, class_transformer_1.Transform)(params => params.value.trim()),
    __metadata("design:type", String)
], SignInInput.prototype, "uniquepassword", void 0);
exports.SignInInput = SignInInput = __decorate([
    (0, graphql_1.InputType)()
], SignInInput);
//# sourceMappingURL=sing-in.input.js.map