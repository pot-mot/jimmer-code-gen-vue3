import ForeignKeyGeneratorDeclare from "./items/ForeignKeyGenerator.ts";
import IndexGeneratorDeclare from "./items/IndexGenerator.ts";
import TableGeneratorDeclare from "./items/TableGenerator.ts";

export type ScriptTypeMap = {
    ForeignKeyGenerator: ForeignKeyGenerator
    IndexGenerator: IndexGenerator
    TableGenerator: TableGenerator
}

export type ScriptTypeName = keyof ScriptTypeMap

export const scriptTypeDeclares = Object.freeze({
    ForeignKeyGenerator: ForeignKeyGeneratorDeclare,
    IndexGenerator: IndexGeneratorDeclare,
    TableGenerator: TableGeneratorDeclare,
})
