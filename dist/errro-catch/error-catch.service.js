"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ErrorHandlerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlerService = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
let ErrorHandlerService = ErrorHandlerService_1 = class ErrorHandlerService {
    constructor() {
        this.logger = new common_1.Logger(ErrorHandlerService_1.name);
    }
    handleError(error) {
        this.logger.error(`handleError: An error occurred, error: ${error.message}`);
        if (error instanceof common_1.HttpException) {
            return this.handleHttpException(error);
        }
        else if (error instanceof jwt.TokenExpiredError) {
            return this.handleTokenExpiredError();
        }
        else if (error instanceof jwt.JsonWebTokenError) {
            return this.handleJsonWebTokenError();
        }
        else {
            return this.handleUnknownError(error);
        }
    }
    handleHttpException(error) {
        this.logger.error(`handleHttpException: Throwing HttpException with message: ${error.message}`);
        throw error;
    }
    handleTokenExpiredError() {
        this.logger.warn(`handleTokenExpiredError: Throwing TokenExpiredError.`);
        throw new common_1.HttpException('Срок действия токена истек', common_1.HttpStatus.BAD_REQUEST);
    }
    handleJsonWebTokenError() {
        this.logger.warn(`handleJsonWebTokenError: Throwing JsonWebTokenError.`);
        throw new common_1.HttpException('Недействительный токен', common_1.HttpStatus.BAD_REQUEST);
    }
    handleUnknownError(error) {
        this.logger.fatal(`handleUnknownError: Critical error occurred, error: ${error.message}`);
        throw new common_1.HttpException('Internet server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
exports.ErrorHandlerService = ErrorHandlerService;
exports.ErrorHandlerService = ErrorHandlerService = ErrorHandlerService_1 = __decorate([
    (0, common_1.Injectable)()
], ErrorHandlerService);
//# sourceMappingURL=error-catch.service.js.map