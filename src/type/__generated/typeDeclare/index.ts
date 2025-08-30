import DatabaseDeclare from "./items/Database.ts";
import SchemaDeclare from "./items/Schema.ts";
import TableDeclare from "./items/Table.ts";
import ColumnDeclare from "./items/Column.ts";
import IndexDeclare from "./items/Index.ts";
import ForeignKeyDeclare from "./items/ForeignKey.ts";

export const typeDeclares = Object.freeze({
    Database: DatabaseDeclare,
    Schema: SchemaDeclare,
    Table: TableDeclare,
    Column: ColumnDeclare,
    Index: IndexDeclare,
    ForeignKey: ForeignKeyDeclare,
})
