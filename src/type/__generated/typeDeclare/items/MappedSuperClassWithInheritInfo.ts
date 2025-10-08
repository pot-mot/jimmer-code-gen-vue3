export default Object.freeze({
    fileName: 'MappedSuperClassWithInheritInfo.d.ts',
    content: `type MappedSuperClassWithInheritInfo = Omit<MappedSuperClassWithCategorizedProperties, 'properties'> & {
    properties: Property[]
} & MappedSuperClassInheritInfo`,
})
