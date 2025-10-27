import type {TableView_TargetOf_columns, TableView_TargetOf_foreignKeys, TableView_TargetOf_indexes} from './';

export interface TableView {
    id: string;
    schema: string;
    name: string;
    comment: string;
    columns: Array<TableView_TargetOf_columns>;
    indexes: Array<TableView_TargetOf_indexes>;
    foreignKeys: Array<TableView_TargetOf_foreignKeys>;
}
