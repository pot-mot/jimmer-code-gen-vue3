type ModelContextData = {
    model: Model
    groupIdMap: Map<string, Group>
    entityIdMap: Map<string, EntityWithProperties>
    mappedSuperClassIdMap: Map<string, MappedSuperClassWithProperties>
    embeddableTypeIdMap: Map<string, EmbeddableTypeWithProperties>
    enumerationIdMap: Map<string, Enumeration>
    associationIdMap: Map<string, AssociationWithSubData>
}

type ModelContext = {
    model: ModelWithSubData
    groupIdMap: Map<string, GroupWithSubData>
    entityIdMap: Map<string, EntityWithCategoryProperties>
    mappedSuperClassIdMap: Map<string, MappedSuperClassWithCategoryProperties>
    embeddableTypeIdMap: Map<string, EmbeddableTypeWithCategoryProperties>
    enumerationIdMap: Map<string, Enumeration>
    associationIdMap: Map<string, AssociationWithSubData>

    mappedSuperClassAllExtendsMap: Map<string, Set<MappedSuperClass>>
    mappedSuperClassAllPropertiesMap: Map<string, CategoryProperties>
    entityAllExtendsMap: Map<string, Set<MappedSuperClass>>
    entityAllPropertiesMap: Map<string, CategoryPropertiesRequiredId>
}
