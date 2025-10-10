export default Object.freeze({
    fileName: 'ManyToOneAbstractAssociation.d.ts',
    content: `type ManyToOneAbstractAssociation = {
    id: string
    nameTemplate: string
    commentTemplate: string
    type: 'ManyToOne_Abstract'
    sourceAbstractEntity: MappedSuperClassWithInheritInfo
    referencedEntity: EntityWithInheritInfo
    sourceProperty: ManyToOneProperty
    withMappedProperty: boolean
    mappedProperty: OneToManyAbstractProperty
    foreignKeyType: ForeignKeyType
}`,
})
