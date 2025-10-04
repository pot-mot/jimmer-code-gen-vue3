export default Object.freeze({
    fileName: 'OneToOneAssociation.d.ts',
    content: `type OneToOneAssociation = {
    id: string
    name: string
    comment: string
    type: 'OneToOne'
    sourceEntity: EntityWithProperties
    referencedEntity: EntityWithProperties
    sourceProperty: OneToOneSourceProperty
    mappedProperty: OneToOneMappedProperty
    foreignKeyType: ForeignKeyType
}`,
})
