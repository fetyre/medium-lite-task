import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { GeneratorService } from 'src/generator/generator.service';

@Module({
	providers: [JwtService, GeneratorService],
	exports: [JwtService]
})
export class JwtModule {}
