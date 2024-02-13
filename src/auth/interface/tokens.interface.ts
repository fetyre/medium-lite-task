/**
 * @interface ITokens
 * @description Интерфейс токенов доступа и обновления
 * @property {string} accessToken - Токен доступа
 * @property {string} refreshToken - Токен обновления
 */
export interface ITokens {
	accessToken: string;
	refreshToken: string;
}
