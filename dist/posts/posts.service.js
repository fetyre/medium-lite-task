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
var PostsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const pots_repository_1 = require("./pots.repository");
const error_catch_service_1 = require("../errro-catch/error-catch.service");
const validate_service_1 = require("../validate/validate.service");
let PostsService = PostsService_1 = class PostsService {
    constructor(postsRepository, errorHandlerService, validateService) {
        this.postsRepository = postsRepository;
        this.errorHandlerService = errorHandlerService;
        this.validateService = validateService;
        this.logger = new common_1.Logger(PostsService_1.name);
    }
    async create(createData, user) {
        try {
            this.logger.log(`create: Starting process, userId: ${user.id}`);
            return await this.postsRepository.savePost(createData, user);
        }
        catch (error) {
            this.logger.error(`create: Error in process, userId:${user.id}, error: ${error.message}`);
            this.errorHandlerService.handleError(error);
        }
    }
    async findAll(take, after, order) {
        try {
            this.logger.log(`findAll: Starting process.`);
            this.validateService.validateNumber(take);
            await this.validatePostId(after);
            this.logger.debug(`findAll: validate post id completed.`);
            return await this.postsRepository.findManyPosts(take, after, order);
        }
        catch (error) {
            this.logger.error(`findOne: Error in process, error: ${error.message}`);
            this.errorHandlerService.handleError(error);
        }
    }
    async validatePostId(after) {
        this.logger.log(`validatePostId: Starting process.`);
        if (after) {
            this.validateService.validateNumber(after);
            return await this.getPostById(after);
        }
    }
    async findOne(id, user) {
        try {
            this.logger.log(`findOne: Starting process, userId: ${user.id}, postId: ${id}`);
            this.validateService.validateNumber(id);
            await this.getPostById(id);
            this.logger.debug(`findOne: post find, userId: ${user.id}, postId: ${id}`);
            return await this.postsRepository.addViewerToPost(id, user);
        }
        catch (error) {
            this.logger.error(`findOne: Error in process, userId:${user.id}, postId:${id}, error: ${error.message}`);
            this.errorHandlerService.handleError(error);
        }
    }
    async getPostById(id) {
        this.logger.log(`getPostById: Starting process, postId: ${id}`);
        const post = await this.postsRepository.findPostById(id);
        this.logger.debug(`getPostById: User search completed, postId: ${id}, post exists:${!!post}`);
        this.handlePost(post);
    }
    handlePost(post) {
        this.logger.log(`handlePost: Starting process. post exists: ${!!post}.`);
        if (!post) {
            this.logger.warn(`handlePost: Post not found.`);
            throw new common_1.HttpException('Post not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = PostsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [pots_repository_1.PostsRepository,
        error_catch_service_1.ErrorHandlerService,
        validate_service_1.ValidateService])
], PostsService);
//# sourceMappingURL=posts.service.js.map