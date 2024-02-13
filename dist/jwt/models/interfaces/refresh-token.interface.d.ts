import { IAccessPayload } from './access-token.interface';
import { ITokenBase } from './token-base.interface';
export interface IRefreshPayload extends IAccessPayload {
}
export interface IRefreshToken extends IRefreshPayload, ITokenBase {
}
