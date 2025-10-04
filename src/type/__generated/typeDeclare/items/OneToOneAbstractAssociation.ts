export default Object.freeze({
    fileName: 'OneToOneAbstractAssociation.d.ts',
    content: `type OneToOneAbstractAssociation = {
    id: string
    name: string
    comment: string
    type: 'OneToOne_Abstract'
    sourceAbstractEntity: MappedSuperClassWithProperties
    referencedEntity: EntityWithProperties
    sourceProperty: OneToOneSourceProperty
    mappedProperty: OneToOneMappedAbstractProperty
    foreignKeyType: ForeignKeyType
}`,
})
