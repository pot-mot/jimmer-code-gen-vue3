import type {ForeignKeyType} from '../enums/';

export interface JoinColumnMeta {
    joinColumnName: string;
    referencedColumnName?: string | undefined;
    foreignKeyType?: ForeignKeyType | undefined;
}
