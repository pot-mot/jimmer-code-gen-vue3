import type {DatabaseType} from '../enums/';

export interface DatabaseView {
    id: string;
    type: DatabaseType;
    name: string;
    url: string;
}
