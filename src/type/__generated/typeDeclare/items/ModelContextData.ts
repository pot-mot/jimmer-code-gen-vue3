export default Object.freeze({
    fileName: 'ModelContextData.d.ts',
    content: `type ModelContextData = {
    model: Model
    groupIdMap: Map<string, Group>
    entityIdMap: Map<string, EntityWithProperties>
    mappedSuperClassIdMap: Map<string, MappedSuperClassWithProperties>
    embeddableTypeIdMap: Map<string, EmbeddableTypeWithProperties>
    enumerationIdMap: Map<string, Enumeration>
    associationIdMap: Map<string, AssociationWithSubData>
}`,
})
