export default {
    fileName: 'ModelContext.d.ts',
    content: `type ModelContext = {
    model: Model
    groupIdMap: Map<string, Group>
    entityIdMap: Map<string, Entity>
    propertyIdMap: Map<string, Property>
    mappedSuperClassIdMap: Map<string, MappedSuperClass>
    embeddableTypeIdMap: Map<string, EmbeddableType>
    enumerationIdMap: Map<string, Enumeration>
}`,
}
