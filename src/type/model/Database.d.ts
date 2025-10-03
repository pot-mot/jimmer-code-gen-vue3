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
    unique: boolean
    wherePredicates?: string
}

type ColumnRef = {
    columnName: string
    referencedColumnName: string
}

type ForeignKey = {
    name: string
    referencedTableName: string
    referencedTableSchema: string
    columnRefs: ColumnRef[]
    onUpdate?: string
    onDelete?: string
}
