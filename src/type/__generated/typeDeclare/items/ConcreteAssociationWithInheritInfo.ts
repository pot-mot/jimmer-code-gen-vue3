export default Object.freeze({
    fileName: 'ConcreteAssociationWithInheritInfo.d.ts',
    content: `type ConcreteAssociationWithInheritInfo = Omit<Association, 'sourceEntity' | 'referencedEntity'> & {
    sourceEntity: EntityWithInheritInfo
    referencedEntity: EntityWithInheritInfo
}`,
})
