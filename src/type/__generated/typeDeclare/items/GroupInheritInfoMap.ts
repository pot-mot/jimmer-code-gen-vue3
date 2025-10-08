export default Object.freeze({
    fileName: 'GroupInheritInfoMap.d.ts',
    content: `type GroupInheritInfoMap = {
    entityMap: Map<string, EntityWithInheritInfo>
    mappedSuperClassMap: Map<string, MappedSuperClassWithInheritInfo>
    embeddableTypeMap: Map<string, EmbeddableTypeWithProperties>
    enumerationMap: Map<string, Enumeration>
}`,
})
