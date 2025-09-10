export default Object.freeze({
    fileName: 'EntityWithInheritInfo.d.ts',
    content: `type EntityWithInheritInfo = EntityWithCategorizedProperties & {
    allExtends: Set<MappedSuperClassWithCategorizedProperties>,
    allProperties: CategorizedPropertiesRequiredId,
}`,
})
