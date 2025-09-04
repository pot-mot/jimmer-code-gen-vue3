type EntityToTable = (entity: Entity, context: Model) => Table

type EntityGenerator = (entity: Entity, context: Model) => Record<string, string>

type MappedSuperClassGenerator = (mappedSuperClass: MappedSuperClass, context: Model) => Record<string, string>

type EmbeddableTypeGenerator = (embeddableType: EmbeddableType, context: Model) => Record<string, string>

type EnumerationGenerator = (enumeration: Enumeration, context: Model) => Record<string, string>

type AssociationGenerator = (association: Association, context: Model) => Record<string, string>

type GroupGenerator = (group: Group, context: Model) => Record<string, string>

type ModelGenerator = (model: Model) => Record<string, string>
