"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ValidateService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateService = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const NO_ERRORS = 0;
const MIN_NUMBER = 0;
let ValidateService = ValidateService_1 = class ValidateService {
    constructor() {
        this.logger = new common_1.Logger(ValidateService_1.name);
    }
    async validateDto(dtoClass, dto) {
        this.logger.log('Starting validateDto');
        const errors = await (0, class_validator_1.validate)(Object.assign(new dtoClass(), dto));
        return this.checkValidateObject(errors);
    }
    checkValidateObject(errors) {
        this.logger.log(`Starting checkValidateObject, number of mistakes: ${errors.length}`);
        if (errors.length > NO_ERRORS) {
            this.logger.fatal(`Error in checkValidateObject, error: ${errors}`);
            throw new common_1.HttpException('A server error occurred', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    validateNumber(num) {
        this.logger.log(`validateNumber: Starting process, number:${num}`);
        if (!Number.isInteger(num) || num < MIN_NUMBER) {
            this.logger.error(`validateNumber: Invalid input, number:${num}`);
            throw new common_1.HttpException('Ошибка введенных данных', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.ValidateService = ValidateService;
exports.ValidateService = ValidateService = ValidateService_1 = __decorate([
    (0, common_1.Injectable)()
], ValidateService);
//# sourceMappingURL=validate.service.js.map