import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { SecurityService } from 'src/security/security.service';
import { UsersRepository } from './users.repository';
import { ValidateService } from 'src/validate/validate.service';

@Module({
	providers: [
		UsersResolver,
		UsersService,
		SecurityService,
		UsersRepository,
		ValidateService
	]
})
export class UsersModule {}
