import TableGeneratorDeclare from "./items/TableGenerator.ts";
import IndexGeneratorDeclare from "./items/IndexGenerator.ts";
import ForeignKeyGeneratorDeclare from "./items/ForeignKeyGenerator.ts";

export const scriptTypeDeclares = Object.freeze({
    TableGenerator: TableGeneratorDeclare,
    IndexGenerator: IndexGeneratorDeclare,
    ForeignKeyGenerator: ForeignKeyGeneratorDeclare,
})

export type ScriptTypeName = keyof typeof scriptTypeDeclares
