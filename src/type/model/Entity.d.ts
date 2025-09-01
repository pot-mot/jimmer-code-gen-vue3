type EntityProperty = |
    ScalarProperty |
    EnumProperty |
    AssociationProperty |
    ManyToManyViewProperty |
    FormulaProperty |
    TransientProperty

type EntityPropertyCategory = EntityProperty["category"]

type Entity = {
    id: string
    package: string
    name: string
    comment: string
    extendsIds: string[]
    extraImports: string[]
    extraAnnotations: string[]
    idProperty: IdProperty
    properties: EntityProperty[]
}

type MappedSuperClass = {
    id: string
    package: string
    name: string
    comment: string
    extendsIds: string[]
    extraImports: string[]
    extraAnnotations: string[]
    properties: EntityProperty[]
}

type EmbeddableTypeProperty = |
    ScalarProperty |
    EnumProperty

type EmbeddableTypePropertyCategory = EmbeddableTypeProperty["category"]

type EmbeddableType = {
    id: string
    package: string
    name: string
    comment: string
    extraImports: string[]
    extraAnnotations: string[]
    properties: EmbeddableTypeProperty[]
}