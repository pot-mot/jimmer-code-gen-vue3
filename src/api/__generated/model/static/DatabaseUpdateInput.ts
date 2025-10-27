import type {DatabaseType} from '../enums/';

export interface DatabaseUpdateInput {
    type: DatabaseType;
    name: string;
    url: string;
    username: string;
    password: string;
    id: string;
}
