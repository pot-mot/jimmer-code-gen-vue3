type OneToOneAssociation = {
    id: string
    name: string
    comment: string
    type: 'OneToOne'
    sourceEntity: EntityWithInheritInfo
    referencedEntity: EntityWithInheritInfo
    sourceProperty: OneToOneSourceProperty
    withMappedProperty: boolean
    mappedProperty: OneToOneMappedProperty
    foreignKeyType: ForeignKeyType
}

type OneToOneAbstractAssociation = {
    id: string
    nameTemplate: string
    commentTemplate: string
    type: 'OneToOne_Abstract'
    sourceAbstractEntity: MappedSuperClassWithInheritInfo
    referencedEntity: EntityWithInheritInfo
    sourceProperty: OneToOneSourceProperty
    withMappedProperty: boolean
    mappedProperty: OneToOneMappedAbstractProperty
    foreignKeyType: ForeignKeyType
}

type ManyToOneAssociation = {
    id: string
    name: string
    comment: string
    type: 'ManyToOne'
    sourceEntity: EntityWithInheritInfo
    referencedEntity: EntityWithInheritInfo
    sourceProperty: ManyToOneProperty
    withMappedProperty: boolean
    mappedProperty: OneToManyProperty
    foreignKeyType: ForeignKeyType
}

type ManyToOneAbstractAssociation = {
    id: string
    nameTemplate: string
    commentTemplate: string
    type: 'ManyToOne_Abstract'
    sourceAbstractEntity: MappedSuperClassWithInheritInfo
    referencedEntity: EntityWithInheritInfo
    sourceProperty: ManyToOneProperty
    withMappedProperty: boolean
    mappedProperty: OneToManyAbstractProperty
    foreignKeyType: ForeignKeyType
}

type ManyToManyAssociation = {
    id: string
    name: string
    comment: string
    type: 'ManyToMany'
    sourceEntity: EntityWithInheritInfo
    referencedEntity: EntityWithInheritInfo
    sourceProperty: ManyToManySourceProperty
    withMappedProperty: boolean
    mappedProperty: ManyToManyMappedProperty
    foreignKeyType: ForeignKeyType
}

type ConcreteAssociation = OneToOneAssociation | ManyToOneAssociation | ManyToManyAssociation

type AbstractAssociation = OneToOneAbstractAssociation | ManyToOneAbstractAssociation

type Association = ConcreteAssociation | AbstractAssociation
