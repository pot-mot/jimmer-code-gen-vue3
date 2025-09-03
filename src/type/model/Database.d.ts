type Database = {
    id: string
    type: DatabaseType
    name: string
    url: string
    username: string
    password: string
}

type Table = {
    id: string
    schema: string
    name: string
    comment: string
    columns: Column[]
    indexes: Index[]
    foreignKeys: ForeignKey[]
}

type Column = {
    name: string
    comment: string
    type: string
    dataSize?: number
    numericPrecision?: number
    nullable: boolean
    defaultValue?: string
    partOfPrimaryKey?: boolean
    autoIncrement?: boolean
    otherConstraints?: string[]
}

type Index = {
    name: string
    columnNames: string[]
    isUnique: boolean
    wherePredicates?: string
}

type ForeignKey = {
    name: string
    targetTableName: string
    columnReferences: [
        {
            sourceColumnName: string
            targetColumnName: string
        }
    ]
    onUpdate?: string
    onDelete?: string
}
