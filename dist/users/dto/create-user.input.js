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
exports.CreateUserInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const sing_in_input_1 = require("../../auth/dto/sing-in.input");
const swagger_1 = require("@nestjs/swagger");
const NAME_REGEX = /^[a-zA-Zа-яА-Я0-9]*$/;
const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 40;
let CreateUserInput = class CreateUserInput extends sing_in_input_1.SignInInput {
};
exports.CreateUserInput = CreateUserInput;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Имя пользователя' }),
    (0, graphql_1.Field)({ description: 'Имя пользователя' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Имя не может быть пустым' }),
    (0, class_validator_1.IsString)({ message: 'Имя должно быть строкой' }),
    (0, class_validator_1.MinLength)(MIN_NAME_LENGTH, {
        message: `Имя должно содержать не менее ${MIN_NAME_LENGTH} символов`
    }),
    (0, class_validator_1.MaxLength)(MAX_NAME_LENGTH, {
        message: `Имя должно содержать не более ${MAX_NAME_LENGTH} символов`
    }),
    (0, class_validator_1.Matches)(NAME_REGEX, {
        message: 'Имя может содержать только буквы и цифры'
    }),
    (0, class_transformer_1.Transform)(params => params.value.trim()),
    __metadata("design:type", String)
], CreateUserInput.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Роль пользователя', enum: client_1.UserRole }),
    (0, graphql_1.Field)(() => client_1.UserRole, { description: 'Роль пользователя' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Роль не может быть пустой' }),
    (0, class_validator_1.IsEnum)(client_1.UserRole, { message: 'Роль не действительна' }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "role", void 0);
exports.CreateUserInput = CreateUserInput = __decorate([
    (0, graphql_1.InputType)()
], CreateUserInput);
//# sourceMappingURL=create-user.input.js.map