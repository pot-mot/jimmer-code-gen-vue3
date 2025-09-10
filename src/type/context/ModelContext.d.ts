type ModelContextData = {
    model: Model
    groupMap: Map<string, Group>
    entityMap: Map<string, EntityWithProperties>
    mappedSuperClassMap: Map<string, MappedSuperClassWithProperties>
    embeddableTypeMap: Map<string, EmbeddableTypeWithProperties>
    enumerationMap: Map<string, Enumeration>
    associationMap: Map<string, Association>
}

type EntityWithInheritInfo = EntityWithCategorizedProperties & {
    allExtends: Set<MappedSuperClassWithCategorizedProperties>,
    allProperties: CategorizedPropertiesRequiredId,
}

type MappedSuperClassWithInheritInfo = MappedSuperClassWithCategorizedProperties & {
    allExtends: Set<MappedSuperClassWithCategorizedProperties>,
    allProperties: CategorizedProperties,
}

type ModelContext = {
    model: Model
    groupMap: Map<string, GroupWithSubMaps>
    entityMap: Map<string, EntityWithInheritInfo>
    mappedSuperClassMap: Map<string, MappedSuperClassWithInheritInfo>
    embeddableTypeMap: Map<string, EmbeddableTypeWithCategorizedProperties>
    enumerationMap: Map<string, Enumeration>
    associationMap: Map<string, AssociationWithSubData>
}
