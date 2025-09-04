import AssociationGeneratorDeclare from "./items/AssociationGenerator.ts";
import EmbeddableTypeGeneratorDeclare from "./items/EmbeddableTypeGenerator.ts";
import EntityGeneratorDeclare from "./items/EntityGenerator.ts";
import EntityToTableDeclare from "./items/EntityToTable.ts";
import EnumerationGeneratorDeclare from "./items/EnumerationGenerator.ts";
import GroupGeneratorDeclare from "./items/GroupGenerator.ts";
import MappedSuperClassGeneratorDeclare from "./items/MappedSuperClassGenerator.ts";
import ModelGeneratorDeclare from "./items/ModelGenerator.ts";
import TableDiffGeneratorDeclare from "./items/TableDiffGenerator.ts";
import TableGeneratorDeclare from "./items/TableGenerator.ts";
import TableToEntityDeclare from "./items/TableToEntity.ts";

export type ScriptTypeMap = {
    AssociationGenerator: AssociationGenerator
    EmbeddableTypeGenerator: EmbeddableTypeGenerator
    EntityGenerator: EntityGenerator
    EntityToTable: EntityToTable
    EnumerationGenerator: EnumerationGenerator
    GroupGenerator: GroupGenerator
    MappedSuperClassGenerator: MappedSuperClassGenerator
    ModelGenerator: ModelGenerator
    TableDiffGenerator: TableDiffGenerator
    TableGenerator: TableGenerator
    TableToEntity: TableToEntity
}

export type ScriptTypeName = keyof ScriptTypeMap

export const scriptTypeDeclares = Object.freeze({
    AssociationGenerator: AssociationGeneratorDeclare,
    EmbeddableTypeGenerator: EmbeddableTypeGeneratorDeclare,
    EntityGenerator: EntityGeneratorDeclare,
    EntityToTable: EntityToTableDeclare,
    EnumerationGenerator: EnumerationGeneratorDeclare,
    GroupGenerator: GroupGeneratorDeclare,
    MappedSuperClassGenerator: MappedSuperClassGeneratorDeclare,
    ModelGenerator: ModelGeneratorDeclare,
    TableDiffGenerator: TableDiffGeneratorDeclare,
    TableGenerator: TableGeneratorDeclare,
    TableToEntity: TableToEntityDeclare,
})
