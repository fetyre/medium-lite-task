import { InputType, Field } from '@nestjs/graphql';
import { ISignIn } from '../interface';
import { Transform } from 'class-transformer';
import {
	IsNotEmpty,
	IsString,
	MinLength,
	MaxLength,
	Matches,
	IsEmail
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * @description Регулярное выражение для пароля
 */
const PASSWORD_REGEX: RegExp = /^(?=.*[a-zA-Zа-яА-Я])(?=.*\d)\S{8,}$/;

/**
 * @description Минимальная длина пароля
 */
const MIN_PASSWORD_LENGTH: number = 8;

/**
 * @description Максимальная длина пароля
 */
const MAX_PASSWORD_LENGTH: number = 35;

/**
 * @class SignInInput
 * @description Данныедля входа пользователя в систему
 * @property {string} email - Электронная почта пользователя
 * @property {string} uniquepassword - Пароль пользователя
 * @implements {ISignIn}
 */
@InputType()
export class SignInInput implements ISignIn {
	@ApiProperty({ description: 'Электронная почта пользователя' })
	@Field({ description: 'Электронная почта пользователя' })
	@IsNotEmpty({ message: 'Email не может быть пустым' })
	@IsEmail({}, { message: 'Недействительный формат email' })
	@Transform(params => params.value.toLowerCase().trim())
	public readonly email!: string;

	@ApiProperty({ description: 'Пароль пользователя' })
	@Field({ description: 'Пароль пользователя' })
	@IsNotEmpty({ message: 'Пароль не может быть пустым' })
	@IsString({ message: 'Пароль должен быть строкой' })
	@MinLength(MIN_PASSWORD_LENGTH, {
		message: `Пароль должен содержать не менее ${MIN_PASSWORD_LENGTH} символов`
	})
	@MaxLength(MAX_PASSWORD_LENGTH, {
		message: `Пароль должен содержать не более ${MAX_PASSWORD_LENGTH} символов`
	})
	@Matches(PASSWORD_REGEX, {
		message: 'Пароль должен содержать хотя бы одну букву и одну цифру'
	})
	@Transform(params => params.value.trim())
	public uniquepassword!: string;
}
