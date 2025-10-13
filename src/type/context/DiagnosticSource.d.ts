type EntitySource = {
    type: "Entity",
    id: string,
}

type MapperSuperClassSource = {
    type: "MappedSuperClass",
    id: string,
}

type EmbeddableTypeSource = {
    type: "EmbeddableType",
    id: string,
}

type EnumerationSource = {
    type: "Enumeration",
    id: string,
}

type AssociationSource = {
    type: "Association",
    id: string,
}

type EntityPropertySource = {
    type: "EntityProperty",
    entityId: string,
    propertyId: string,
}

type MappedSuperClassPropertySource = {
    type: "MappedSuperClassProperty",
    mappedSuperClassId: string,
    propertyId: string,
}

type EmbeddableTypePropertySource = {
    type: "EmbeddableTypeProperty",
    embeddableTypeId: string,
    propertyId: string,
}

type EnumerationItemSource = {
    type: "EnumerationItem",
    enumerationId: string,
    itemId: string,
}

type MappedPropertySource = {
    type: "MappedProperty",
    associationId: string,
}

type DiagnosticSource =
    | EntitySource
    | MapperSuperClassSource
    | EmbeddableTypeSource
    | EnumerationSource
    | AssociationSource
    | EntityPropertySource
    | MappedSuperClassPropertySource
    | EmbeddableTypePropertySource
    | EnumerationItemSource
    | MappedPropertySource
