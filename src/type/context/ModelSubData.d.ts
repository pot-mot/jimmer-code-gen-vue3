type ModelSubData = {
    groups: Group[]
    entities: EntityWithProperties[]
    mappedSuperClasses: MappedSuperClassWithProperties[]
    embeddableTypes: EmbeddableTypeWithProperties[]
    enumerations: Enumeration[]
    associations: Association[]
}

type ModelWithSubData = Model & ModelSubData
