import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtService } from 'src/jwt/jwt.service';
import { SecurityService } from 'src/security/security.service';
import { UsersRepository } from 'src/users/users.repository';
import { GeneratorService } from 'src/generator/generator.service';
import { UsersService } from 'src/users/users.service';
import { ValidateService } from 'src/validate/validate.service';

@Module({
	providers: [
		AuthResolver,
		AuthService,
		UsersRepository,
		SecurityService,
		JwtService,
		GeneratorService,
		UsersService,
		ValidateService
	]
})
export class AuthModule {}
