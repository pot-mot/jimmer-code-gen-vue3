import EntityGeneratorDeclare from "./items/EntityGenerator.ts";
import EntityToTableDeclare from "./items/EntityToTable.ts";
import TableDiffGeneratorDeclare from "./items/TableDiffGenerator.ts";
import TableGeneratorDeclare from "./items/TableGenerator.ts";
import TableToEntityDeclare from "./items/TableToEntity.ts";

export type ScriptTypeMap = {
    EntityGenerator: EntityGenerator
    EntityToTable: EntityToTable
    TableDiffGenerator: TableDiffGenerator
    TableGenerator: TableGenerator
    TableToEntity: TableToEntity
}

export type ScriptTypeName = keyof ScriptTypeMap

export const scriptTypeDeclares = Object.freeze({
    EntityGenerator: EntityGeneratorDeclare,
    EntityToTable: EntityToTableDeclare,
    TableDiffGenerator: TableDiffGeneratorDeclare,
    TableGenerator: TableGeneratorDeclare,
    TableToEntity: TableToEntityDeclare,
})
