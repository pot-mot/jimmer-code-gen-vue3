type TableToEntity = (
    tables: DeepReadonly<Table[]>,
    context: DeepReadonly<ModelContext>
) => {
    groups: Group[],
    entities: Entity[],
    mappedSuperClasses: MappedSuperClass[],
    embeddableTypes: EmbeddableType[],
    enumerations: Enumeration[],
    associations: Association[],
}

type EntityToTable = (
    entity: DeepReadonly<Entity>,
    context: DeepReadonly<ModelContext>
) => Table
