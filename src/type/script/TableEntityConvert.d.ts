type TableToEntity = (
    tables: DeepReadonly<Table[]>,
    context: DeepReadonly<ModelContext>
) => {
    entities: EntityWithProperties[],
    associations: Association[],
}

type EntityToTable = (
    entity: DeepReadonly<EntityWithInheritInfo>,
    context: DeepReadonly<ModelContext>
) => Table
