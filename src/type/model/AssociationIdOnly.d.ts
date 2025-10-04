type OneToOneAssociationIdOnly = {
    id: string
    name: string
    comment: string
    type: 'OneToOne'
    sourceEntityId: string
    referencedEntityId: string
    sourcePropertyId: string
    mappedProperty: OneToOneMappedProperty
    foreignKeyType: ForeignKeyType
}

type OneToOneAbstractAssociationIdOnly = {
    id: string
    name: string
    comment: string
    type: 'OneToOne_Abstract'
    sourceAbstractEntityId: string
    referencedEntityId: string
    sourcePropertyId: string
    mappedProperty: OneToOneMappedAbstractProperty
    foreignKeyType: ForeignKeyType
}

type ManyToOneAssociationIdOnly = {
    id: string
    name: string
    comment: string
    type: 'ManyToOne'
    sourceEntityId: string
    referencedEntityId: string
    sourcePropertyId: string
    mappedProperty: OneToManyProperty
    foreignKeyType: ForeignKeyType
}

type ManyToOneAbstractAssociationIdOnly = {
    id: string
    name: string
    comment: string
    type: 'ManyToOne_Abstract'
    sourceAbstractEntityId: string
    referencedEntityId: string
    sourcePropertyId: string
    mappedProperty: OneToManyAbstractProperty
    foreignKeyType: ForeignKeyType
}

type ManyToManyAssociationIdOnly = {
    id: string
    name: string
    comment: string
    type: 'ManyToMany'
    sourceEntityId: string
    referencedEntityId: string
    sourcePropertyId: string
    mappedProperty: ManyToManyMappedProperty
    foreignKeyType: ForeignKeyType
}
