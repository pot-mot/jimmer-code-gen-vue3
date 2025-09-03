type EntityToTable = (entities: Entity[], context: Model) => Table[]

type EntityGenerator = (entity: Entity, context: Model) => Record<string, string>
