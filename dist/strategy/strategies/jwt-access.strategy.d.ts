import { Strategy, VerifiedCallback } from 'passport-jwt';
import { StrategyService } from 'src/strategy/strategy.service';
import { ErrorHandlerService } from 'src/errro-catch/error-catch.service';
import { ConfirmPayload } from 'src/strategy/interface/confirm-stategy.interface';
import { ConfigLoaderService } from 'src/config/config-loader.service';
declare const JwtAccessStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtAccessStrategy extends JwtAccessStrategy_base {
    private readonly configLoaderService;
    private readonly strategyService;
    private readonly errorHandlerService;
    private readonly logger;
    constructor(configLoaderService: ConfigLoaderService, strategyService: StrategyService, errorHandlerService: ErrorHandlerService);
    validate(payload: ConfirmPayload, done: VerifiedCallback): Promise<void>;
}
export {};
