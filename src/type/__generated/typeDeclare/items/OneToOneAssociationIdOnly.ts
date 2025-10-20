export default Object.freeze({
    fileName: 'OneToOneAssociationIdOnly.d.ts',
    content: `type OneToOneAssociationIdOnly = {
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
}`,
})
