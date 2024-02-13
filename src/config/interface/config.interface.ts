import { IJwt } from './jwt.interface';

/**
 * @interface IConfig
 * @description Интерфейс конфигурации приложения
 */
export interface IConfig {
	id: string;
	port: number;
	domain: string;
	jwt: IJwt;
}
