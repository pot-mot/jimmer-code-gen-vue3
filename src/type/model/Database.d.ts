type Database = {
    id: string
    name: string,
    url: string,
    username: string,
    password: string,
    schemas: Schema[]
}

type Schema = {
    id: string
    name: string,
    tables: Table[]
}

type Table = {
    id: string
    name: string,
    comment: string,
    columns: Column[]
    indexes: Index[]
}

type Column = {
    id: string
    name: string,
    comment: string,
    type: string,
    dataSize?: number,
    numericPrecision?: number,
    nullable: boolean,
    defaultValue: string,
    partOfPrimaryKey: boolean,
    autoIncrement?: boolean,
    otherConstraints?: string[],
}

type Index = {
    id: string
    name: string,
    columnIds: string[],
    isUnique: boolean,
}

type ForeignKey = {
    id: string
    name: string,
    sourceTableId: string,
    targetTableId: string,
    columnReferences: [
        {
            sourceColumnId: string,
            targetColumnId: string,
        }
    ]
}
