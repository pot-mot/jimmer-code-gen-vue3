type TableToEntity = (
    groupId: string,
    tables: DeepReadonly<Table[]>,
    context: DeepReadonly<ModelContext>
) => {
    entities: EntityWithProperties[],
    embeddableTypes: EmbeddableTypeWithProperties[],
    associations: AssociationIdOnly[],
}

type EntityToTable = (
    entities: DeepReadonly<EntityWithInheritInfo[]>,
    context: DeepReadonly<ModelContext>
) => {
    tables: Table[],
    midTables: Table[]
}
