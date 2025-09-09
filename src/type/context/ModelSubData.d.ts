type ModelSubData = {
    groups: GroupWithSubData[]
    entities: EntityWithCategoryProperties[]
    mappedSuperClasses: MappedSuperClassWithCategoryProperties[]
    embeddableTypes: EmbeddableTypeWithCategoryProperties[]
    enumerations: Enumeration[]
    associations: AssociationWithSubData[]
}

type ModelWithSubData = Model & ModelSubData
