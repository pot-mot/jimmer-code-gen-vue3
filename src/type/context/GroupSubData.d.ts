type GroupSubData = {
    entities?: EntityWithCategoryProperties[]
    mappedSuperClasses?: MappedSuperClassWithCategoryProperties[]
    embeddableTypes?: EmbeddableTypeWithCategoryProperties[]
    enumerations?: Enumeration[]
}

type GroupWithSubData = Group & GroupSubData
