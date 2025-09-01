import TableGeneratorDeclare from "./items/TableGenerator.ts";
import IndexGeneratorDeclare from "./items/IndexGenerator.ts";
import ForeignKeyGeneratorDeclare from "./items/ForeignKeyGenerator.ts";

export type ScriptTypeMap = {
    TableGenerator: TableGenerator
    IndexGenerator: IndexGenerator
    ForeignKeyGenerator: ForeignKeyGenerator
}

export type ScriptTypeName = keyof ScriptTypeMap

export const scriptTypeDeclares = Object.freeze({
    TableGenerator: TableGeneratorDeclare,
    IndexGenerator: IndexGeneratorDeclare,
    ForeignKeyGenerator: ForeignKeyGeneratorDeclare,
})
