/**
 * @interface IJwtConfig
 * @description Интерфейс конфигурации jwt
 * @property {string} publicKey - Публичный ключ
 * @property {string} privateKey - Приватный ключ
 * @property {number} time - Время жизни токена
 */
interface IJwtConfig {
	publicKey: string;
	privateKey: string;
	time: number;
}

/**
 * @interface IJwt
 * @description Интерфейс jwt
 * @property {IJwtConfig} access - Конфигурация токена доступа
 * @property {IJwtConfig} refresh - Конфигурация токена обновления
 */
export interface IJwt {
	access: IJwtConfig;
	refresh: IJwtConfig;
}
