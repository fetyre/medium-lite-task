import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { StrategyService } from 'src/strategy/strategy.service';
import { ErrorHandlerService } from 'src/errro-catch/error-catch.service';
import { ConfirmPayload } from 'src/strategy/interface/confirm-stategy.interface';
import { JWT_ALGORITHM } from 'src/common/global-const';
import { ConfigLoaderService } from 'src/config/config-loader.service';

/**
 * @class JwtAccessStrategy
 * @description Access стратегия
 */
@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
	Strategy,
	'jwtAccessStrategy'
) {
	private readonly logger: Logger = new Logger(JwtAccessStrategy.name);

	constructor(
		private readonly configLoaderService: ConfigLoaderService,
		private readonly strategyService: StrategyService,
		private readonly errorHandlerService: ErrorHandlerService
	) {
		const domain: string = configLoaderService.domain;
		const issuer: string = configLoaderService.issuer;
		const { publicKey } = configLoaderService.jwtConfig.access;
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			algorithms: [JWT_ALGORITHM],
			secretOrKey: publicKey,
			audience: domain,
			issuer: issuer
		});
	}

	async validate(payload: ConfirmPayload, done: VerifiedCallback) {
		try {
			this.logger.log(`validate: Starting process, userId:${payload.id}.`);
			const value: ConfirmPayload =
				await this.strategyService.validatePayload(payload);
			this.logger.debug(`validate: Payload validated. userId: ${value.id}`);
			const user: User = await this.strategyService.checkAndFindUserById(
				value.id
			);
			this.logger.log(`validate: User found. userId: ${user.id}`);
			done(null, { user });
		} catch (error) {
			this.logger.error(`validate: Error in process. error: ${error.message}`);
			this.errorHandlerService.handleError(error);
		}
	}
}
