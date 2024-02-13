import { IConfig } from './interface/config.interface';

/**
 * @function config
 * @description Функция получения конфигурации приложения
 * @returns {IConfig} Объект конфигурации приложения
 */
export function config(): IConfig {
	return {
		id: process.env.APP_ID,
		port: parseInt(process.env.PORT, 10),
		domain: process.env.DOMAIN,
		jwt: {
			access: {
				privateKey: process.env.JWT_ACCESS_PRIVATE_KEY,
				publicKey: process.env.JWT_ACCESS_PUBLIC_KEY,
				time: parseInt(process.env.JWT_ACCESS_TIME, 10)
			},
			refresh: {
				privateKey: process.env.JWT_REFRESH_PRIVATE_KEY,
				publicKey: process.env.JWT_REFRESH_PUBLIC_KEY,
				time: parseInt(process.env.JWT_REFRESH_TIME, 10)
			}
		}
	};
}
