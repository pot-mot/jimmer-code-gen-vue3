export default Object.freeze({
    fileName: 'AssociationSubData.d.ts',
    content: `type AssociationSubData = {
    sourceEntity: EntityWithCategorizedProperties | MappedSuperClassWithCategorizedProperties
    targetEntity: EntityWithCategorizedProperties | MappedSuperClassWithCategorizedProperties
    sourceProperty: AssociationProperty
    targetProperty: AssociationProperty
}`,
})
