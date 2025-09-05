type TableGenerator = (table: Table) => Record<string, string>

type TableDiffGenerator = (oldTable: Table, newTable: Table) => Record<string, string>