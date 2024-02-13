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
var UsersRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.database/prisma.service");
let UsersRepository = UsersRepository_1 = class UsersRepository {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(UsersRepository_1.name);
    }
    async findUserByEmail(email) {
        this.logger.log(`findUserByEmail: Starting process. email: ${email}`);
        return await this.prisma.user.findUnique({
            where: { email },
            include: {
                posts: true,
                viewedPosts: true
            }
        });
    }
    async saveUser(createData) {
        this.logger.log(`saveUser: Starting process, email:${createData.email}.`);
        return await this.prisma.user.create({
            data: { ...createData },
            include: {
                posts: true,
                viewedPosts: true
            }
        });
    }
    async findUserById(id) {
        this.logger.log(`findUserById: Starting process. userId: ${id}`);
        return await this.prisma.user.findUnique({
            where: { id },
            include: {
                posts: true,
                viewedPosts: true
            }
        });
    }
    async findUserWithoutPostsById(id) {
        this.logger.log(`findUserWithoutPostsById: Starting process. userId: ${id}`);
        return await this.prisma.user.findUnique({
            where: { id }
        });
    }
    async findManyUsers(limit, offset, order) {
        this.logger.log(`findManyUsers: Starting process.`);
        return await this.prisma.user.findMany({
            skip: offset,
            take: limit,
            orderBy: { id: order || 'asc' },
            include: {
                posts: true,
                viewedPosts: true
            }
        });
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = UsersRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map