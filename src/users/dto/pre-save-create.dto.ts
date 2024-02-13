import { IsNotEmpty, IsString, Matches, Length } from 'class-validator';
import { IPreSaveUser } from '../interface';
import { CreateUserInput } from './create-user.input';
import { ApiProperty } from '@nestjs/swagger';

/**
 * @description Длина пароля
 */
const PASSWORD_LENGTH: number = 60;

/**
 * @description Регулярное выражение для пароля
 */
const PASSWORD_REGEX: RegExp = /^\$2[ayb]\$.{56}$/;

/**
 * @class PreSaveUserDto
 * @extends {CreateUserInput}
 * @description Класс для валидации данных перед сохранением
 */
export class PreSaveUserDto extends CreateUserInput implements IPreSaveUser {
	@ApiProperty({ description: 'Хэшированный пароль' })
	@IsString({ message: 'Пароль должен быть строкой' })
	@Length(PASSWORD_LENGTH, PASSWORD_LENGTH)
	@Matches(PASSWORD_REGEX, {
		message: 'Пароль должен содержать хотя бы одну букву и одну цифру'
	})
	@IsNotEmpty({ message: 'Пароль обязателен' })
	public readonly uniquepassword: string;
}
