import { IAccessPayload, IRefreshPayload } from '../interfaces';

/**
 * @type JwtPayloadType
 * @description Тип для полезной нагрузки токена
 */
export type JwtPayloadType = IAccessPayload | IRefreshPayload;
