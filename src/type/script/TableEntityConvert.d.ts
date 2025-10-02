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
    entity: DeepReadonly<EntityWithInheritInfo>,
    context: DeepReadonly<ModelContext>
) => Table
