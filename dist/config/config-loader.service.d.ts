import { ConfigService } from '@nestjs/config';
import { IJwt } from './interface';
export declare class ConfigLoaderService {
    private readonly configService;
    private readonly logger;
    readonly issuer: string;
    readonly domain: string;
    readonly jwtConfig: IJwt;
    constructor(configService: ConfigService);
    private getStringConfig;
}
