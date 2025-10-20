export default Object.freeze({
    fileName: 'ManyToManyAssociationIdOnly.d.ts',
    content: `type ManyToManyAssociationIdOnly = {
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
}`,
})
