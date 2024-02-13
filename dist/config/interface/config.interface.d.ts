import { IJwt } from './jwt.interface';
export interface IConfig {
    id: string;
    port: number;
    domain: string;
    jwt: IJwt;
}
