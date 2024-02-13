import { IAccessPayload } from './access-token.interface';
import { ITokenBase } from './token-base.interface';

/**
 * @interface IRefreshPayload
 * @description Интерфейс полезной нагрузки токена обновления
 * @extends IAccessPayload
 */
export interface IRefreshPayload extends IAccessPayload {}

/**
 * @interface IRefreshToken
 * @description Интерфейс для токена обновления
 * @extends IRefreshPayload
 * @extends ITokenBase
 */
export interface IRefreshToken extends IRefreshPayload, ITokenBase {}
