import { IAccessPayload } from 'src/jwt/models/interfaces';
export interface ConfirmPayload extends IAccessPayload {
    jti: string;
}
