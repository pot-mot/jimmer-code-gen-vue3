import type {DatabaseType} from '../enums/';

export interface DatabaseInsertInput {
    type: DatabaseType;
    name: string;
    url: string;
    username: string;
    password: string;
}
