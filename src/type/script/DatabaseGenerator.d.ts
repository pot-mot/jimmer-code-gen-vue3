type TableToEntity = (tables: Table[]) => {
    entities: Entity[],
    associations: Association[],
}

type TableGenerator = (table: Table) => Record<string, string>

type TableDiffGenerator = (oldTable: Table, newTable: Table) => Record<string, string>