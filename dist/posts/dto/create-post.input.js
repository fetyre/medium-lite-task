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
exports.CreatePostInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const MIN_LENGTH_TITLE = 5;
const MAX_LENGTH_TITLE = 100;
const MIN_CONTENT_TITLE = 10;
const MAX_CONTENT_TITLE = 5000;
const DATA_REGEX = /^[а-яА-Яa-zA-Z0-9\s]*$/;
let CreatePostInput = class CreatePostInput {
};
exports.CreatePostInput = CreatePostInput;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Заголовок поста' }),
    (0, graphql_1.Field)({ description: 'Заголовок поста' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Заголовок не может быть пустым' }),
    (0, class_validator_1.IsString)({ message: 'Заголовок должен быть строкой' }),
    (0, class_validator_1.MinLength)(MIN_LENGTH_TITLE, {
        message: `Заголовок должен содержать не менее ${MIN_LENGTH_TITLE} символов`
    }),
    (0, class_validator_1.MaxLength)(MAX_LENGTH_TITLE, {
        message: `Заголовок должен содержать не более ${MAX_LENGTH_TITLE} символов`
    }),
    (0, class_validator_1.Matches)(DATA_REGEX, {
        message: 'Заголовок может содержать только русские и английские буквы, цифры и пробелы'
    }),
    __metadata("design:type", String)
], CreatePostInput.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Содержание поста' }),
    (0, graphql_1.Field)({ description: 'Содержание поста' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Содержание не может быть пустым' }),
    (0, class_validator_1.IsString)({ message: 'Содержание должно быть строкой' }),
    (0, class_validator_1.MinLength)(MIN_CONTENT_TITLE, {
        message: `Содержание должно содержать не менее ${MIN_CONTENT_TITLE} символов`
    }),
    (0, class_validator_1.MaxLength)(MAX_CONTENT_TITLE, {
        message: `Содержание должно содержать не более ${MAX_CONTENT_TITLE} символов`
    }),
    (0, class_validator_1.Matches)(DATA_REGEX, {
        message: 'Содержание может содержать только русские и английские буквы, цифры и пробелы'
    }),
    __metadata("design:type", String)
], CreatePostInput.prototype, "content", void 0);
exports.CreatePostInput = CreatePostInput = __decorate([
    (0, graphql_1.InputType)()
], CreatePostInput);
//# sourceMappingURL=create-post.input.js.map