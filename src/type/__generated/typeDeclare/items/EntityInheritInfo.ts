export default Object.freeze({
    fileName: 'EntityInheritInfo.d.ts',
    content: `type EntityInheritInfo = {
    directExtends: Set<MappedSuperClassWithInheritInfo>,
    allExtends: Set<MappedSuperClassWithInheritInfo>
    allProperties: Property[]
}`,
})
