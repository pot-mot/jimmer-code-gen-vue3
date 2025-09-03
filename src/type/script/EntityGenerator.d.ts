type EntityToTable = (entity: Entity, context: Model) => Table

type EntityGenerator = (entity: Entity, context: Model) => Record<string, string>
