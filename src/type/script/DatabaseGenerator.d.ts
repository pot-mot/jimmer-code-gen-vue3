type TableGenerator = {
    scriptTypeName: 'TableGenerator'
    (table: Table): string
}

type IndexGenerator = {
    scriptTypeName: 'IndexGenerator'
    (index: Index): string
}

type ForeignKeyGenerator = {
    scriptTypeName: 'ForeignKeyGenerator'
    (foreignKey: ForeignKey): string
}