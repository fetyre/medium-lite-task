import { InputType, Field } from '@nestjs/graphql';
import { ICreatePost } from '../interface/create-post.interface';
import { ApiProperty } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsString,
	Matches,
	MaxLength,
	MinLength
} from 'class-validator';

const MIN_LENGTH_TITLE: number = 5;
const MAX_LENGTH_TITLE: number = 100;
const MIN_CONTENT_TITLE: number = 10;
const MAX_CONTENT_TITLE: number = 5000;
const DATA_REGEX: RegExp = /^[а-яА-Яa-zA-Z0-9\s]*$/;

/**
 * @class CreatePostInput
 * @description даныне необходимые для создания нового поста.
 * @property {string} title - Заголовок поста
 * @property {string} content - Содержание поста
 * @implements {ICreatePost}
 */
/**
 * @class CreatePostInput
 * @description даныне необходимые для создания нового поста.
 * @property {string} title - Заголовок поста
 * @property {string} content - Содержание поста
 * @implements {ICreatePost}
 */
@InputType()
export class CreatePostInput implements ICreatePost {
	@ApiProperty({ description: 'Заголовок поста' })
	@Field({ description: 'Заголовок поста' })
	@IsNotEmpty({ message: 'Заголовок не может быть пустым' })
	@IsString({ message: 'Заголовок должен быть строкой' })
	@MinLength(MIN_LENGTH_TITLE, {
		message: `Заголовок должен содержать не менее ${MIN_LENGTH_TITLE} символов`
	})
	@MaxLength(MAX_LENGTH_TITLE, {
		message: `Заголовок должен содержать не более ${MAX_LENGTH_TITLE} символов`
	})
	@Matches(DATA_REGEX, {
		message:
			'Заголовок может содержать только русские и английские буквы, цифры и пробелы'
	})
	public readonly title!: string;

	@ApiProperty({ description: 'Содержание поста' })
	@Field({ description: 'Содержание поста' })
	@IsNotEmpty({ message: 'Содержание не может быть пустым' })
	@IsString({ message: 'Содержание должно быть строкой' })
	@MinLength(MIN_CONTENT_TITLE, {
		message: `Содержание должно содержать не менее ${MIN_CONTENT_TITLE} символов`
	})
	@MaxLength(MAX_CONTENT_TITLE, {
		message: `Содержание должно содержать не более ${MAX_CONTENT_TITLE} символов`
	})
	@Matches(DATA_REGEX, {
		message:
			'Содержание может содержать только русские и английские буквы, цифры и пробелы'
	})
	public readonly content!: string;
}
