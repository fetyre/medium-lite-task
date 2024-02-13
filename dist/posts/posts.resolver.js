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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const posts_service_1 = require("./posts.service");
const post_entity_1 = require("./entities/post.entity");
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../decor/current-user.decorator");
const jwt_graphql_access_auth_guard_1 = require("../guards/jwt-graphql-access-auth.guard");
const create_post_input_1 = require("./dto/create-post.input");
let PostsResolver = class PostsResolver {
    constructor(postsService) {
        this.postsService = postsService;
    }
    async createPost(createPostInput, user) {
        return await this.postsService.create(createPostInput, user);
    }
    async findAll(take, after, order) {
        return await this.postsService.findAll(take, after, order);
    }
    async findOne(id, user) {
        return await this.postsService.findOne(id, user);
    }
};
exports.PostsResolver = PostsResolver;
__decorate([
    (0, graphql_1.Mutation)(() => post_entity_1.Post),
    (0, common_1.UseGuards)(jwt_graphql_access_auth_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Args)('createPostInput')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_input_1.CreatePostInput, Object]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "createPost", null);
__decorate([
    (0, graphql_1.Query)(() => [post_entity_1.Post], { name: 'posts' }),
    (0, common_1.UseGuards)(jwt_graphql_access_auth_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Args)('take')),
    __param(1, (0, graphql_1.Args)('after', { nullable: true })),
    __param(2, (0, graphql_1.Args)('order', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => post_entity_1.Post, { name: 'post' }),
    (0, common_1.UseGuards)(jwt_graphql_access_auth_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "findOne", null);
exports.PostsResolver = PostsResolver = __decorate([
    (0, graphql_1.Resolver)(() => post_entity_1.Post),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsResolver);
//# sourceMappingURL=posts.resolver.js.map