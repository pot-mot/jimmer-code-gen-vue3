import DatabaseJsonSchema from "./items/Database.ts";
import SchemaJsonSchema from "./items/Schema.ts";
import TableJsonSchema from "./items/Table.ts";
import ColumnJsonSchema from "./items/Column.ts";
import IndexJsonSchema from "./items/Index.ts";
import ForeignKeyJsonSchema from "./items/ForeignKey.ts";

export const jsonSchemas = Object.freeze({
    Database: DatabaseJsonSchema,
    Schema: SchemaJsonSchema,
    Table: TableJsonSchema,
    Column: ColumnJsonSchema,
    Index: IndexJsonSchema,
    ForeignKey: ForeignKeyJsonSchema,
})

export type JsonSchemaKey = keyof typeof jsonSchemas
