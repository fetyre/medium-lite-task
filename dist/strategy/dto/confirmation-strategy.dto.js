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
exports.ValidateConfirmPayload = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const MIN_ID = 1;
class ValidateConfirmPayload {
}
exports.ValidateConfirmPayload = ValidateConfirmPayload;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID отправителя'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ID отправителя не может быть пустым' }),
    (0, class_validator_1.IsInt)({ message: 'ID должен быть целым числом.' }),
    (0, class_validator_1.Min)(MIN_ID, { message: 'ID должен быть положительным числом.' }),
    __metadata("design:type", Number)
], ValidateConfirmPayload.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(['admin', 'user']),
    __metadata("design:type", String)
], ValidateConfirmPayload.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID токена'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Токен не может быть пустым.' }),
    (0, class_validator_1.IsString)({ message: 'Токен должен быть строкой.' }),
    (0, class_validator_1.IsUUID)(4, { message: 'Токен должен соответствовать формату UUID v4.' }),
    __metadata("design:type", String)
], ValidateConfirmPayload.prototype, "jti", void 0);
//# sourceMappingURL=confirmation-strategy.dto.js.map