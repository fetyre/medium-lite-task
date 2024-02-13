import { ConfirmPayload } from '../interface/confirm-stategy.interface';
export declare class ValidateConfirmPayload implements ConfirmPayload {
    readonly id: number;
    readonly role: string;
    readonly jti: string;
}
