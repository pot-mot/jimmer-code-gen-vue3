type Database = {
    type: DatabaseType
    name: string
    url: string
    username: string
    password: string
}

type Table = {
    schema: string
    name: string
    comment: string
    columns: Column[]
    indexes: Index[]
    foreignKeys: ForeignKey[]
    checks: Check[]
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
}

type Index = {
    name: string
    columnNames: string[]
    uniqueIndex: boolean
    wherePredicates?: string
}

type ColumnRef = {
    columnName: string
    referencedColumnName: string
}

type ForeignKey = {
    name: string
    comment: string
    referencedTableName: string
    referencedTableSchema: string
    columnRefs: ColumnRef[]
    onUpdate?: string
    onDelete?: string
}

type Check = {
    name: string
    expression: string
}
