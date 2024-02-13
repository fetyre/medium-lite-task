import { Injectable, Logger } from '@nestjs/common';
import { v4 } from 'uuid';

/**
 * @class GeneratorService
 * @description Сервис для генерации уникальных значений
 */
@Injectable()
export class GeneratorService {
	private readonly logger: Logger = new Logger(GeneratorService.name);

	/**
	 * @method generateUuid
	 * @description Генерирует уникальный id UUID v4
	 * @returns {string} Строка сгенерированная  UUID
	 */
	public generateUuid(): string {
		this.logger.log(`generateUuid: Starting process.`);
		return v4();
	}
}
