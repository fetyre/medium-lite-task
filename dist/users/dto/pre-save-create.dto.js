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
exports.PreSaveUserDto = void 0;
const class_validator_1 = require("class-validator");
const create_user_input_1 = require("./create-user.input");
const swagger_1 = require("@nestjs/swagger");
const PASSWORD_LENGTH = 60;
const PASSWORD_REGEX = /^\$2[ayb]\$.{56}$/;
class PreSaveUserDto extends create_user_input_1.CreateUserInput {
}
exports.PreSaveUserDto = PreSaveUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Хэшированный пароль' }),
    (0, class_validator_1.IsString)({ message: 'Пароль должен быть строкой' }),
    (0, class_validator_1.Length)(PASSWORD_LENGTH, PASSWORD_LENGTH),
    (0, class_validator_1.Matches)(PASSWORD_REGEX, {
        message: 'Пароль должен содержать хотя бы одну букву и одну цифру'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Пароль обязателен' }),
    __metadata("design:type", String)
], PreSaveUserDto.prototype, "uniquepassword", void 0);
//# sourceMappingURL=pre-save-create.dto.js.map