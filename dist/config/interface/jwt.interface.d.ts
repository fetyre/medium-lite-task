interface IJwtConfig {
    publicKey: string;
    privateKey: string;
    time: number;
}
export interface IJwt {
    access: IJwtConfig;
    refresh: IJwtConfig;
}
export {};
