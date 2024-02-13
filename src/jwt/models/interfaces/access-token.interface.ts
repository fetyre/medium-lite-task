import { ITokenBase } from './token-base.interface';

/**
 * @interface IAccessPayload
 * @description Интерфейс полезной нагрузки токена доступа
 * @property {number} id - id пользователя
 * @property {string} role - Роль пользователя
 */
export interface IAccessPayload {
	id: number;
	role: string;
}

/**
 * @interface IAccessToken
 * @description Интерфейс для токена доступа
 * @extends IAccessPayload
 * @extends ITokenBase
 */
export interface IAccessToken extends IAccessPayload, ITokenBase {}
