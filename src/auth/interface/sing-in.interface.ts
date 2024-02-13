/**
 * @interface ISignIn
 * @description  Интерфейс для вход в систему
 * @property {string} email - Электронная почта пользователя
 * @property {string} uniquepassword - Пароль пользователя
 */
export interface ISignIn {
	email: string;
	uniquepassword: string;
}
