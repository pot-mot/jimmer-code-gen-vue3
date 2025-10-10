export default Object.freeze({
    fileName: 'ManyToManyAssociationIdOnly.d.ts',
    content: `type ManyToManyAssociationIdOnly = {
    id: string
    name: string
    useNameTemplate: boolean
    comment: string
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
