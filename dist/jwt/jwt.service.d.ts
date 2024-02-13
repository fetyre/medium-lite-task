import { User } from '@prisma/client';
import { TokenTypeEnum } from './models/enums/token-type.enum';
import { JwtPayloadType } from './models/types/jwt.type';
import { GeneratorService } from '../generator/generator.service';
import { ConfigLoaderService } from '../config/config-loader.service';
export declare class JwtService {
    private readonly configLoaderService;
    private readonly generatorService;
    private readonly logger;
    constructor(configLoaderService: ConfigLoaderService, generatorService: GeneratorService);
    private createJwtToken;
    generateToken(user: User, tokenType: TokenTypeEnum): Promise<string>;
    private generateAccessToken;
    private generateRefreshToken;
    verifyRefreshToken(token: string): Promise<JwtPayloadType>;
    private createJwtOptions;
    private verifyTokenAsync;
}
