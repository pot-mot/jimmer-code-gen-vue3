export default Object.freeze({
    fileName: 'ManyToManyAssociationIdOnly.d.ts',
    content: `type ManyToManyAssociationIdOnly = {
    id: string
    name: string
    comment: string
    type: 'ManyToMany'
    sourceEntityId: string
    referencedEntityId: string
    sourcePropertyId: string
    mappedProperty: ManyToManyMappedProperty
    foreignKeyType: ForeignKeyType
}`,
})
