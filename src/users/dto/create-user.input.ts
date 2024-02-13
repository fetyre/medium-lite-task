import { Field, InputType } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';
import { ICreateUser } from '../interface';
import {
	IsEnum,
	IsNotEmpty,
	IsString,
	Matches,
	MaxLength,
	MinLength
} from 'class-validator';
import { Transform } from 'class-transformer';
import { SignInInput } from '../../auth/dto/sing-in.input';
import { ApiProperty } from '@nestjs/swagger';

/**
 * @description Регулярное выражение для имени
 */
const NAME_REGEX: RegExp = /^[a-zA-Zа-яА-Я0-9]*$/;

/**
 * @description Минимальная длина имени
 */
const MIN_NAME_LENGTH: number = 3;

/**
 * @description Максимальная длина имени
 */
const MAX_NAME_LENGTH: number = 40;

/**
 * @class CreateUserInput
 * @description даныне необходимые для создания нового пользователя.
 * @property {string} name - Имя пользователя
 * @property {UserRole} role - Роль пользователя
 * @extends SignInInput
 * @implements {ICreateUser}
 */
@InputType()
export class CreateUserInput extends SignInInput implements ICreateUser {
	@ApiProperty({ description: 'Имя пользователя' })
	@Field({ description: 'Имя пользователя' })
	@IsNotEmpty({ message: 'Имя не может быть пустым' })
	@IsString({ message: 'Имя должно быть строкой' })
	@MinLength(MIN_NAME_LENGTH, {
		message: `Имя должно содержать не менее ${MIN_NAME_LENGTH} символов`
	})
	@MaxLength(MAX_NAME_LENGTH, {
		message: `Имя должно содержать не более ${MAX_NAME_LENGTH} символов`
	})
	@Matches(NAME_REGEX, {
		message: 'Имя может содержать только буквы и цифры'
	})
	@Transform(params => params.value.trim())
	public readonly name!: string;

	@ApiProperty({ description: 'Роль пользователя', enum: UserRole })
	@Field(() => UserRole, { description: 'Роль пользователя' })
	@IsNotEmpty({ message: 'Роль не может быть пустой' })
	@IsEnum(UserRole, { message: 'Роль не действительна' })
	public readonly role!: UserRole;
}
