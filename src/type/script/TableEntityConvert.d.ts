type TableToEntity = (
    tables: DeepReadonly<Table[]>,
    context: DeepReadonly<ModelContext>
) => {
    groups: Group[],
    entities: EntityWithProperties[],
    mappedSuperClasses: MappedSuperClassWithProperties[],
    embeddableTypes: EmbeddableTypeWithProperties[],
    enumerations: Enumeration[],
    associations: Association[],
}

type EntityToTable = (
    entity: DeepReadonly<EntityWithInheritInfo>,
    context: DeepReadonly<ModelContext>
) => Table
