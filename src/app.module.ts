import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { GeneratorModule } from './generator/generator.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { ErrorHandlerModule } from './errro-catch/error-catch.module';
import { ValidateModule } from './validate/validate.module';
import { JwtModule } from './jwt/jwt.module';
import { PrismaModule } from './prisma.database/prisma.module';
import { ConfigLoaderModule } from './config/config-loader.module';
import { validationSchema } from './config/config.schema';
import { config } from './config';
import { StrategyModule } from './strategy/strategy.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema,
			load: [config]
		}),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: true
		}),
		UsersModule,
		AuthModule,
		PostsModule,
		GeneratorModule,
		ConfigLoaderModule,
		ErrorHandlerModule,
		ValidateModule,
		JwtModule,
		PrismaModule,
		StrategyModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
