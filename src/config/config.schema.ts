import * as Joi from 'joi';
import { IConfig } from './interface';

/**
 * @constant validationSchema
 * @description Схема валидации
 */
export const validationSchema: Joi.ObjectSchema<IConfig> = Joi.object({
	APP_ID: Joi.string().required(),
	PORT: Joi.number().required(),
	JWT_ACCESS_TIME: Joi.number().required(),
	JWT_ACCESS_PUBLIC_KEY: Joi.string().required(),
	JWT_ACCESS_PRIVATE_KEY: Joi.string().required(),
	JWT_REFRESH_PUBLIC_KEY: Joi.string().required(),
	JWT_REFRESH_PRIVATE_KEY: Joi.string().required(),
	JWT_REFRESH_TIME: Joi.number().required()
});
