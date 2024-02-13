export declare class ErrorHandlerService {
    private readonly logger;
    handleError(error: any): void;
    private handleHttpException;
    private handleTokenExpiredError;
    private handleJsonWebTokenError;
    private handleUnknownError;
}
