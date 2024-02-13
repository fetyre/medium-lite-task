import { AuthService } from './auth.service';
import { SignInInput } from './dto/sing-in.input';
import { IAuth } from './interface';
import { UpdateTokenInput } from './dto/update-token.input';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(signInData: SignInInput): Promise<IAuth>;
    updateToken(updateData: UpdateTokenInput): Promise<IAuth>;
}
