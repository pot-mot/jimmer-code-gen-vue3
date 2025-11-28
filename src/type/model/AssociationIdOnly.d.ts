type OneToOneAssociationIdOnly = {
    id: string
    name: string
    nameTemplate: string
    useNameTemplate: boolean
    comment: string
    commentTemplate: string
    useCommentTemplate: boolean
    type: 'OneToOne'
    sourceEntityId: string
    referencedEntityId: string
    sourcePropertyId: string
    withMappedProperty: boolean
    mappedProperty: OneToOneMappedProperty
    foreignKeyType: ForeignKeyType
}

type OneToOneAbstractAssociationIdOnly = {
    id: string
    nameTemplate: string
    commentTemplate: string
    type: 'OneToOne_Abstract'
    sourceAbstractEntityId: string
    referencedEntityId: string
    sourcePropertyId: string
    withMappedProperty: boolean
    mappedProperty: OneToOneMappedAbstractProperty
    foreignKeyType: ForeignKeyType
}

type ManyToOneAssociationIdOnly = {
    id: string
    name: string
    nameTemplate: string
    useNameTemplate: boolean
    comment: string
    commentTemplate: string
    useCommentTemplate: boolean
    type: 'ManyToOne'
    sourceEntityId: string
    referencedEntityId: string
    sourcePropertyId: string
    withMappedProperty: boolean
    mappedProperty: OneToManyProperty
    foreignKeyType: ForeignKeyType
}

type ManyToOneAbstractAssociationIdOnly = {
    id: string
    nameTemplate: string
    commentTemplate: string
    type: 'ManyToOne_Abstract'
    sourceAbstractEntityId: string
    referencedEntityId: string
    sourcePropertyId: string
    withMappedProperty: boolean
    mappedProperty: OneToManyAbstractProperty
    foreignKeyType: ForeignKeyType
}

type ManyToManyAssociationIdOnly = {
    id: string
    name: string
    nameTemplate: string
    useNameTemplate: boolean
    comment: string
    commentTemplate: string
    useCommentTemplate: boolean
    type: 'ManyToMany'
    sourceEntityId: string
    referencedEntityId: string
    sourcePropertyId: string
    withMappedProperty: boolean
    mappedProperty: ManyToManyMappedProperty
    foreignKeyType: ForeignKeyType
}

type ManyToManyAbstractAssociationIdOnly = {
    id: string
    nameTemplate: string
    commentTemplate: string
    type: 'ManyToMany_Abstract'
    sourceAbstractEntityId: string
    referencedEntityId: string
    sourcePropertyId: string
    withMappedProperty: boolean
    mappedProperty: ManyToManyMappedAbstractProperty
    foreignKeyType: ForeignKeyType
}
