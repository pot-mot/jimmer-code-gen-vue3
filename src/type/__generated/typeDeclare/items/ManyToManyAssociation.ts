export default Object.freeze({
    fileName: 'ManyToManyAssociation.d.ts',
    content: `type ManyToManyAssociation = {
    id: string
    name: string
    comment: string
    type: 'ManyToMany'
    sourceEntity: EntityWithInheritInfo
    referencedEntity: EntityWithInheritInfo
    sourceProperty: ManyToManySourceProperty
    mappedProperty: ManyToManyMappedProperty
    foreignKeyType: ForeignKeyType
}`,
})
