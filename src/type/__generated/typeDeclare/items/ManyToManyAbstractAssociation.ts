export default Object.freeze({
    fileName: 'ManyToManyAbstractAssociation.d.ts',
    content: `type ManyToManyAbstractAssociation = {
    id: string
    nameTemplate: string
    commentTemplate: string
    type: 'ManyToMany_Abstract'
    sourceAbstractEntity: MappedSuperClassWithInheritInfo
    referencedEntity: EntityWithInheritInfo
    sourceProperty: ManyToManySourceProperty
    withMappedProperty: boolean
    mappedProperty: ManyToManyMappedAbstractProperty
    foreignKeyType: ForeignKeyType
}`,
})
