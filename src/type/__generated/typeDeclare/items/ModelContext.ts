export default Object.freeze({
    fileName: 'ModelContext.d.ts',
    content: `type ModelContext = {
    model: ModelWithSubData

    groupMap: Map<string, GroupWithSubData>
    entityMap: Map<string, EntityWithCategorizedProperties>
    mappedSuperClassMap: Map<string, MappedSuperClassWithCategorizedProperties>
    embeddableTypeMap: Map<string, EmbeddableTypeWithCategorizedProperties>
    enumerationMap: Map<string, Enumeration>
    associationMap: Map<string, AssociationWithSubData>

    mappedSuperClassAllExtendsMap: Map<string, Set<MappedSuperClass>>
    mappedSuperClassAllPropertiesMap: Map<string, CategorizedProperties>
    entityAllExtendsMap: Map<string, Set<MappedSuperClass>>
    entityAllPropertiesMap: Map<string, CategorizedPropertiesRequiredId>
}`,
})
