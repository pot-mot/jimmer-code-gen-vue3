type ModelContextData = {
    model: Model
    groupMap: Map<string, Group>
    entityMap: Map<string, EntityWithProperties>
    mappedSuperClassMap: Map<string, MappedSuperClassWithProperties>
    embeddableTypeMap: Map<string, EmbeddableTypeWithProperties>
    enumerationMap: Map<string, Enumeration>
    associationMap: Map<string, Association>
}

type ModelContext = {
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
}
