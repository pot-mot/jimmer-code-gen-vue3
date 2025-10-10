export default Object.freeze({
    fileName: 'EntityInheritInfo.d.ts',
    content: `type EntityInheritInfo = {
    directExtends: Set<MappedSuperClassWithCategorizedProperties>,
    allExtends: Set<MappedSuperClassWithCategorizedProperties>
    allProperties: Property[]
}`,
})
