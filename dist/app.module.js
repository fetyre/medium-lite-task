"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const posts_module_1 = require("./posts/posts.module");
const generator_module_1 = require("./generator/generator.module");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const config_1 = require("@nestjs/config");
const error_catch_module_1 = require("./errro-catch/error-catch.module");
const validate_module_1 = require("./validate/validate.module");
const jwt_module_1 = require("./jwt/jwt.module");
const prisma_module_1 = require("./prisma.database/prisma.module");
const config_loader_module_1 = require("./config/config-loader.module");
const config_schema_1 = require("./config/config.schema");
const config_2 = require("./config");
const strategy_module_1 = require("./strategy/strategy.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: config_schema_1.validationSchema,
                load: [config_2.config]
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: true
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            posts_module_1.PostsModule,
            generator_module_1.GeneratorModule,
            config_loader_module_1.ConfigLoaderModule,
            error_catch_module_1.ErrorHandlerModule,
            validate_module_1.ValidateModule,
            jwt_module_1.JwtModule,
            prisma_module_1.PrismaModule,
            strategy_module_1.StrategyModule
        ],
        controllers: [],
        providers: []
    })
], AppModule);
//# sourceMappingURL=app.module.js.map