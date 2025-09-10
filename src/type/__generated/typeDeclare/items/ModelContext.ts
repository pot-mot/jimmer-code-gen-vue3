export default Object.freeze({
    fileName: 'ModelContext.d.ts',
    content: `type ModelContext = {
    model: ModelWithSubData
    groupMap: Map<string, GroupWithSubData>
    entityMap: Map<string, EntityWithInheritInfo>
    mappedSuperClassMap: Map<string, MappedSuperClassWithInheritInfo>
    embeddableTypeMap: Map<string, EmbeddableTypeWithCategorizedProperties>
    enumerationMap: Map<string, Enumeration>
    associationMap: Map<string, AssociationWithSubData>
}`,
})
