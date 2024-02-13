import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { SignInInput } from './dto/sing-in.input';
import { IAuth } from './interface';
import { UpdateTokenInput } from './dto/update-token.input';

@Resolver('auth')
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Mutation(() => Auth)
	async signIn(@Args('signInInput') signInData: SignInInput): Promise<IAuth> {
		return await this.authService.signIn(signInData);
	}

	@Mutation(() => Auth)
	async updateToken(
		@Args('updateToken') updateData: UpdateTokenInput
	): Promise<IAuth> {
		return await this.authService.updateToken(updateData);
	}
}
