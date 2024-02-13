import { Field, InputType } from '@nestjs/graphql';
import { IUpdateToken } from '../interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

/**
 * @class UpdateTokenInput
 * @description Токен обнвления для получение нового токена доступа.
 * @property {string} token - Токен обновления пользователя
 * @implements {IUpdateToken}
 */
@InputType()
export class UpdateTokenInput implements IUpdateToken {
	@ApiProperty({ description: 'Токен обновления пользователя' })
	@Field({ description: 'Токен обновления' })
	@IsJWT()
	token: string;
}
