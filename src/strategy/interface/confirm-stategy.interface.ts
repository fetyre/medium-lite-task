import { IAccessPayload } from 'src/jwt/models/interfaces';

/**
 * @interface ConfirmPayload
 * @description Интерфейс полезной нагрузки токена
 */
export interface ConfirmPayload extends IAccessPayload {
	jti: string;
}
