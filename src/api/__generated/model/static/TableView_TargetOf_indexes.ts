export interface TableView_TargetOf_indexes {
    id: string;
    name: string;
    columnNames: Array<string>;
    uniqueIndex: boolean;
    wherePredicates?: string | undefined;
}
