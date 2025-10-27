import type {DbColumnRef} from './';

export interface TableView_TargetOf_foreignKeys {
    id: string;
    name: string;
    comment: string;
    referencedTableName: string;
    referencedTableSchema: string;
    onUpdate?: string | undefined;
    onDelete?: string | undefined;
    columnRefs: Array<DbColumnRef>;
}
