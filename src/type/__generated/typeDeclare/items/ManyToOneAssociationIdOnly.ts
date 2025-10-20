export default Object.freeze({
    fileName: 'ManyToOneAssociationIdOnly.d.ts',
    content: `type ManyToOneAssociationIdOnly = {
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
}`,
})
