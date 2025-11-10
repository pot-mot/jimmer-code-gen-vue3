import AssociationGeneratorDeclare from "./items/AssociationGenerator.ts";
import EmbeddableTypeGeneratorDeclare from "./items/EmbeddableTypeGenerator.ts";
import EntityGeneratorDeclare from "./items/EntityGenerator.ts";
import EnumerationGeneratorDeclare from "./items/EnumerationGenerator.ts";
import GroupGeneratorDeclare from "./items/GroupGenerator.ts";
import MappedSuperClassGeneratorDeclare from "./items/MappedSuperClassGenerator.ts";
import ModelGeneratorDeclare from "./items/ModelGenerator.ts";
import TableGeneratorDeclare from "./items/TableGenerator.ts";

export type ScriptTypeMap = {
    AssociationGenerator: AssociationGenerator
    EmbeddableTypeGenerator: EmbeddableTypeGenerator
    EntityGenerator: EntityGenerator
    EnumerationGenerator: EnumerationGenerator
    GroupGenerator: GroupGenerator
    MappedSuperClassGenerator: MappedSuperClassGenerator
    ModelGenerator: ModelGenerator
    TableGenerator: TableGenerator
}

export type ScriptTypeName = keyof ScriptTypeMap

export const scriptTypeDeclares = Object.freeze({
    AssociationGenerator: AssociationGeneratorDeclare,
    EmbeddableTypeGenerator: EmbeddableTypeGeneratorDeclare,
    EntityGenerator: EntityGeneratorDeclare,
    EnumerationGenerator: EnumerationGeneratorDeclare,
    GroupGenerator: GroupGeneratorDeclare,
    MappedSuperClassGenerator: MappedSuperClassGeneratorDeclare,
    ModelGenerator: ModelGeneratorDeclare,
    TableGenerator: TableGeneratorDeclare,
})
