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
var PostsRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.database/prisma.service");
const SKIP_COUNT = 1;
let PostsRepository = PostsRepository_1 = class PostsRepository {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(PostsRepository_1.name);
    }
    async savePost(saveData, user) {
        this.logger.log(`savePost: Starting process, userId: ${user.id}.`);
        return await this.prisma.post.create({
            data: { ...saveData, authorId: user.id },
            include: {
                author: true,
                viewers: true
            }
        });
    }
    async findPostById(id) {
        this.logger.log(`findPostById: Starting process, postId: ${id}.`);
        return await this.prisma.post.findUnique({
            where: { id },
            include: {
                author: true,
                viewers: true
            }
        });
    }
    async addViewerToPost(id, user) {
        this.logger.log(`addViewerToPost: Starting process, postId: ${id}.`);
        return await this.prisma.post.update({
            where: { id },
            data: {
                viewers: {
                    connect: {
                        id: user.id
                    }
                }
            },
            include: {
                author: true,
                viewers: true
            }
        });
    }
    async findManyPosts(take, after, order) {
        this.logger.log(`addViewerToPost: Starting process.`);
        return this.prisma.post.findMany({
            take,
            skip: after ? SKIP_COUNT : undefined,
            cursor: after ? { id: after } : undefined,
            orderBy: { id: order || 'asc' },
            include: {
                author: true,
                viewers: true
            }
        });
    }
};
exports.PostsRepository = PostsRepository;
exports.PostsRepository = PostsRepository = PostsRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostsRepository);
//# sourceMappingURL=pots.repository.js.map