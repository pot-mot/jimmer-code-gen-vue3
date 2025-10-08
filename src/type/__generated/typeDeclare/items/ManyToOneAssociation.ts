export default Object.freeze({
    fileName: 'ManyToOneAssociation.d.ts',
    content: `type ManyToOneAssociation = {
    id: string
    name: string
    comment: string
    type: 'ManyToOne'
    sourceEntity: EntityWithInheritInfo
    referencedEntity: EntityWithInheritInfo
    sourceProperty: ManyToOneProperty
    mappedProperty: OneToManyProperty
    foreignKeyType: ForeignKeyType
}`,
})
