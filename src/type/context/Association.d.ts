type OneToOneAssociation = {
    id: string
    name: string
    comment: string
    type: 'OneToOne'
    sourceEntity: EntityWithProperties
    referencedEntity: EntityWithProperties
    sourceProperty: OneToOneSourceProperty
    mappedProperty: OneToOneMappedProperty
    foreignKeyType: ForeignKeyType
}

type OneToOneAbstractAssociation = {
    id: string
    nameTemplate: string
    commentTemplate: string
    type: 'OneToOne_Abstract'
    sourceAbstractEntity: MappedSuperClassWithProperties
    referencedEntity: EntityWithProperties
    sourceProperty: OneToOneSourceProperty
    mappedProperty: OneToOneMappedAbstractProperty
    foreignKeyType: ForeignKeyType
}

type ManyToOneAssociation = {
    id: string
    name: string
    comment: string
    type: 'ManyToOne'
    sourceEntity: EntityWithProperties
    referencedEntity: EntityWithProperties
    sourceProperty: ManyToOneProperty
    mappedProperty: OneToManyProperty
    foreignKeyType: ForeignKeyType
}

type ManyToOneAbstractAssociation = {
    id: string
    nameTemplate: string
    commentTemplate: string
    type: 'ManyToOne_Abstract'
    sourceAbstractEntity: MappedSuperClassWithProperties
    referencedEntity: EntityWithProperties
    sourceProperty: ManyToOneProperty
    mappedProperty: OneToManyAbstractProperty
    foreignKeyType: ForeignKeyType
}

type ManyToManyAssociation = {
    id: string
    name: string
    comment: string
    type: 'ManyToMany'
    sourceEntity: EntityWithProperties
    referencedEntity: EntityWithProperties
    sourceProperty: ManyToManySourceProperty
    mappedProperty: ManyToManyMappedProperty
    foreignKeyType: ForeignKeyType
}

type ConcreteAssociation = OneToOneAssociation | ManyToOneAssociation | ManyToManyAssociation

type AbstractAssociation = OneToOneAbstractAssociation | ManyToOneAbstractAssociation

type Association = ConcreteAssociation | AbstractAssociation

type ConcreteAssociationWithInheritInfo = Omit<Association, 'sourceEntity' | 'referencedEntity'> & {
    sourceEntity: EntityWithInheritInfo
    referencedEntity: EntityWithInheritInfo
}

type AbstractAssociationWithInheritInfo = Omit<Association, 'sourceAbstractEntity' | 'referencedEntity'> & {
    sourceAbstractEntity: MappedSuperClassWithInheritInfo
    referencedEntity: EntityWithInheritInfo
}

type AssociationWithInheritInfo = ConcreteAssociation | AbstractAssociation
