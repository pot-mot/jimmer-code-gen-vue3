type EntityToTable = (entity: Entity, context: ModelContext) => Table

type EntityGenerator = (entity: Entity, context: ModelContext) => Record<string, string>

type MappedSuperClassGenerator = (mappedSuperClass: MappedSuperClass, context: ModelContext) => Record<string, string>

type EmbeddableTypeGenerator = (embeddableType: EmbeddableType, context: ModelContext) => Record<string, string>

type EnumerationGenerator = (enumeration: Enumeration, context: ModelContext) => Record<string, string>

type AssociationGenerator = (association: Association, context: ModelContext) => Record<string, string>

type GroupGenerator = (group: Group, context: ModelContext) => Record<string, string>

type ModelGenerator = (model: Model, context: ModelContext) => Record<string, string>
