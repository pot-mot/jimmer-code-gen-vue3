export default Object.freeze({
    fileName: 'OneToOneAbstractAssociation.d.ts',
    content: `type OneToOneAbstractAssociation = {
    id: string
    nameTemplate: string
    commentTemplate: string
    type: 'OneToOne_Abstract'
    sourceAbstractEntity: MappedSuperClassWithInheritInfo
    referencedEntity: EntityWithInheritInfo
    sourceProperty: OneToOneSourceProperty
    withMappedProperty: boolean
    mappedProperty: OneToOneMappedAbstractProperty
    foreignKeyType: ForeignKeyType
}`,
})
