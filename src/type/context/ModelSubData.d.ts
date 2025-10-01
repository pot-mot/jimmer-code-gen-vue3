type ModelSubData = {
    groups: Group[]
    entities: EntityWithProperties[]
    mappedSuperClasses: MappedSuperClassWithProperties[]
    embeddableTypes: EmbeddableTypeWithProperties[]
    enumerations: Enumeration[]
    associations: {association: AssociationIdOnly, labelPosition: LabelPosition}[]
}
