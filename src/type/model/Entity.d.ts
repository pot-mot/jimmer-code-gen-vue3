type Entity = {
    id: string
    groupId: string
    subPackagePath: string
    name: string
    comment: string
    tableName: string
    extendsIds: string[]
    extraImports: string[]
    extraAnnotations: string[]
    idProperty: IdProperty
    scalarProperties: (
        ScalarProperty |
        EnumProperty
        )[]
    associationProperties: (
        AssociationProperty |
        ManyToManyViewProperty
        )[]
    computedProperties: (
        FormulaProperty |
        TransientProperty
        )[]
}

type MappedSuperClass = Omit<Entity, 'tableName' | 'idProperty'>

type EmbeddableType = {
    id: string
    groupId: string
    subPackagePath: string
    name: string
    comment: string
    extraImports: string[]
    extraAnnotations: string[]
    properties: (
        ScalarProperty |
        EnumProperty
        )[]
}