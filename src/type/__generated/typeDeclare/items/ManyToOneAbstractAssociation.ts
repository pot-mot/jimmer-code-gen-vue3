export default Object.freeze({
    fileName: 'ManyToOneAbstractAssociation.d.ts',
    content: `type ManyToOneAbstractAssociation = {
    id: string
    name: string
    type: 'ManyToOne_Abstract'
    sourceAbstractEntity: MappedSuperClassWithProperties
    referencedEntity: EntityWithProperties
    sourceProperty: ManyToOneProperty
    mappedProperty: OneToManyAbstractProperty
    foreignKeyType: ForeignKeyType
}`,
})
