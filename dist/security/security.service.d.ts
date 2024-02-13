export declare class SecurityService {
    private readonly logger;
    hashPassword(password: string): Promise<string>;
    compareValues(hashedValue: string, value: string): Promise<boolean>;
}
