import { ICreateUser } from './create-user.interface';

/**
 * @interface IPreSaveUser
 * @description Интерфейс для данных пользователя перед сохранением
 * @extends {ICreateUser}
 */
export interface IPreSaveUser extends ICreateUser {}
