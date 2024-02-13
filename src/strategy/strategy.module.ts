import { Module } from '@nestjs/common';
import { ValidateService } from 'src/validate/validate.service';
import { UsersRepository } from 'src/users/users.repository';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { StrategyService } from './strategy.service';

@Module({
	providers: [
		StrategyService,
		ValidateService,
		UsersRepository,
		JwtAccessStrategy
	]
})
export class StrategyModule {}
