import { UserRole } from '@prisma/client';
import { ISignIn } from '../../auth/interface';

/**
 * @interface ICreateUser
 * @description Интерфейс для данных необходимых для создания нового пользователя
 * @property {string} name - Имя пользователя
 * @property {UserRole} role - Роль пользователя
 * @extends ISignIn
 */
export interface ICreateUser extends ISignIn {
	readonly name: string;
	readonly role: UserRole;
}
