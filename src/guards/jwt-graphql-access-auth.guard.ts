import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

/**
 * @class GqlAuthGuard
 * @description защита graphql маршрутов с использованием стратегии jwtAccessStrategy
 * @extends AuthGuard
 */
@Injectable()
export class GqlAuthGuard extends AuthGuard('jwtAccessStrategy') {
	getRequest(contextt: ExecutionContext) {
		const ctx: GqlExecutionContext = GqlExecutionContext.create(contextt);
		const gqlReq = ctx.getContext().req;
		if (gqlReq) {
			const { variables } = ctx.getArgs();
			gqlReq.body = variables;
			return gqlReq;
		}
		return contextt.switchToHttp().getRequest();
	}
}
