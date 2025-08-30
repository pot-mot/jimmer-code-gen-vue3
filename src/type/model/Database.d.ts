type Database = {
    name: string,
    url: string,
    username: string,
    password: string,
    schemas: Schema[]
}

type Schema = {
    name: string,
    tables: Table[]
}

type Table = {
    name: string,
    comment: string,
    columns: Column[]
    indexes: Index[]
}

type Column = {
    name: string,
    comment: string,
    type: string,
    isNullable: boolean,
    defaultValue: string,
    partOfPrimaryKey: boolean,
}

type Index = {
    name: string,
    columnNames: string[],
    isUnique: boolean,
}

type ForeignKey = {
    name: string,
    sourceTableName: string,
    targetTableName: string,
    columnReferences: [
        {
            sourceColumnName: string,
            targetColumnName: string,
        }
    ]
}
