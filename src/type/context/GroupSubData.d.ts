type GroupSubData = {
    entities: EntityWithProperties[]
    mappedSuperClasses: MappedSuperClassWithProperties[]
    embeddableTypes: EmbeddableTypeWithProperties[]
    enumerations: Enumeration[]
}

type GroupWithSubData = Group & GroupSubData
