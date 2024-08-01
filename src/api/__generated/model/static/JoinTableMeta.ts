import type {ForeignKeyType} from '../enums/';
import type {Pair} from './';

export interface JoinTableMeta {
    tableName: string;
    columnNamePairs: Array<Pair<string, string>>;
    foreignKeyType?: ForeignKeyType | undefined;
}
