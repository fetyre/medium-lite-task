import { ApiProperty } from '@nestjs/swagger';
import {
	IsString,
	IsNotEmpty,
	IsUUID,
	IsIn,
	IsInt,
	Min
} from 'class-validator';
import { ConfirmPayload } from '../interface/confirm-stategy.interface';

/**
 * @description милимальное занчение id
 */
const MIN_ID: number = 1;

/**
 * @class ValidateConfirmPayload
 * @description Класс для валидации полезной нагрузки токена
 * @implements {ConfirmPayload}
 */
export class ValidateConfirmPayload implements ConfirmPayload {
	@ApiProperty({
		description: 'ID отправителя'
	})
	@IsNotEmpty({ message: 'ID отправителя не может быть пустым' })
	@IsInt({ message: 'ID должен быть целым числом.' })
	@Min(MIN_ID, { message: 'ID должен быть положительным числом.' })
	public readonly id: number;

	@IsString()
	@IsNotEmpty()
	@IsIn(['admin', 'user'])
	public readonly role: string;

	@ApiProperty({
		description: 'ID токена'
	})
	@IsNotEmpty({ message: 'Токен не может быть пустым.' })
	@IsString({ message: 'Токен должен быть строкой.' })
	@IsUUID(4, { message: 'Токен должен соответствовать формату UUID v4.' })
	public readonly jti: string;
}
