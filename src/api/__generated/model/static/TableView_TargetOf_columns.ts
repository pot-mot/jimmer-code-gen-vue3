export interface TableView_TargetOf_columns {
    id: string;
    name: string;
    comment: string;
    type: string;
    dataSize?: number | undefined;
    numericPrecision?: number | undefined;
    nullable: boolean;
    defaultValue?: string | undefined;
    partOfPrimaryKey?: boolean | undefined;
    autoIncrement?: boolean | undefined;
}
