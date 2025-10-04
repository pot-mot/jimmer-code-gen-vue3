export default Object.freeze({
    fileName: 'ManyToOneAssociation.d.ts',
    content: `type ManyToOneAssociation = {
    id: string
    name: string
    comment: string
    type: 'ManyToOne'
    sourceEntity: EntityWithProperties
    referencedEntity: EntityWithProperties
    sourceProperty: ManyToOneProperty
    mappedProperty: OneToManyProperty
    foreignKeyType: ForeignKeyType
}`,
})
