export declare class ValidateService {
    private readonly logger;
    validateDto<T extends object, V extends object>(dtoClass: new () => T, dto: V): Promise<void>;
    private checkValidateObject;
    validateNumber(num: number): void;
}
