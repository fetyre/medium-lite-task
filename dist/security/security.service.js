"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SecurityService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const ROUND_PASSWORD = 10;
let SecurityService = SecurityService_1 = class SecurityService {
    constructor() {
        this.logger = new common_1.Logger(SecurityService_1.name);
    }
    async hashPassword(password) {
        this.logger.log(`Starting hashPassword`);
        return await bcrypt.hash(password, ROUND_PASSWORD);
    }
    async compareValues(hashedValue, value) {
        this.logger.log(`Starting compareValues`);
        return await bcrypt.compare(value, hashedValue);
    }
};
exports.SecurityService = SecurityService;
exports.SecurityService = SecurityService = SecurityService_1 = __decorate([
    (0, common_1.Injectable)()
], SecurityService);
//# sourceMappingURL=security.service.js.map