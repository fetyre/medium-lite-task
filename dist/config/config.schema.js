"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const Joi = require("joi");
exports.validationSchema = Joi.object({
    APP_ID: Joi.string().required(),
    PORT: Joi.number().required(),
    JWT_ACCESS_TIME: Joi.number().required(),
    JWT_ACCESS_PUBLIC_KEY: Joi.string().required(),
    JWT_ACCESS_PRIVATE_KEY: Joi.string().required(),
    JWT_REFRESH_PUBLIC_KEY: Joi.string().required(),
    JWT_REFRESH_PRIVATE_KEY: Joi.string().required(),
    JWT_REFRESH_TIME: Joi.number().required()
});
//# sourceMappingURL=config.schema.js.map