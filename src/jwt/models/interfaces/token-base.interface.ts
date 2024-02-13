/**
 * @interface ITokenBase
 * @description Базовый интерфейс токена
 * @property {number} iat - Время выдачи токена
 * @property {number} exp - Время истечения токена
 * @property {string} iss - Издатель токена
 * @property {string} aud - Аудитория токена
 * @property {number} sub - Тема токена
 */
export interface ITokenBase {
	iat: number;
	exp: number;
	iss: string;
	aud: string;
	jti: string;
}
