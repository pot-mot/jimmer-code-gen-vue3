type ConcreteAssociationIdOnly =
    | OneToOneAssociationIdOnly
    | ManyToOneAssociationIdOnly
    | ManyToManyAssociationIdOnly

type AbstractAssociationIdOnly =
    | OneToOneAbstractAssociationIdOnly
    | ManyToOneAbstractAssociationIdOnly

type AssociationIdOnly =
    | ConcreteAssociationIdOnly
    | AbstractAssociationIdOnly

type ModelGraphSubData = {
    groups: Group[]
    entities: {data: EntityWithProperties, position: Position}[]
    mappedSuperClasses: {data: MappedSuperClassWithProperties, position: Position}[]
    embeddableTypes: {data: EmbeddableTypeWithProperties, position: Position}[]
    enumerations: {data: Enumeration, position: Position}[]
    associations: {data: AssociationIdOnly, labelPosition: LabelPosition}[]
}
