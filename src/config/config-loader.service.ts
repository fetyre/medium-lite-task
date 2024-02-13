import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IJwt } from './interface';

/**
 * @class ConfigLoaderService
 * @description Сервис для загрузки конфигурации приложения
 */
@Injectable()
export class ConfigLoaderService {
	private readonly logger: Logger = new Logger(ConfigLoaderService.name);

	readonly issuer: string;
	readonly domain: string;
	readonly jwtConfig: IJwt;

	constructor(private readonly configService: ConfigService) {
		this.jwtConfig = this.configService.get<IJwt>('jwt');
		this.issuer = this.getStringConfig('id');
		this.domain = this.getStringConfig('domain');
	}

	/**
	 * @method getStringConfig
	 * @description Метод для получения строковой конфигурации по ключу
	 * @param {string} key - Ключ для получения конфигурации
	 * @returns {string} Pначение конфигурации
	 */
	private getStringConfig(key: string): string {
		this.logger.log(`getStringConfig: Starting process, key:${key}`);
		return this.configService.get<string>(key);
	}
}
