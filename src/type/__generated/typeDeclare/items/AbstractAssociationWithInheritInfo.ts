export default Object.freeze({
    fileName: 'AbstractAssociationWithInheritInfo.d.ts',
    content: `type AbstractAssociationWithInheritInfo = Omit<Association, 'sourceAbstractEntity' | 'referencedEntity'> & {
    sourceAbstractEntity: MappedSuperClassWithInheritInfo
    referencedEntity: EntityWithInheritInfo
}`,
})
