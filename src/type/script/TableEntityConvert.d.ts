type TableToEntity = (tables: Table[]) => {
    entities: Entity[],
    associations: Association[],
}

type EntityToTable = (entity: Entity, context: ModelContext) => Table
