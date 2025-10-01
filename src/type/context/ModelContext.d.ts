type ModelContextData = {
    model: Model
    groupMap: Map<string, Group>
    entityMap: Map<string, EntityWithProperties>
    mappedSuperClassMap: Map<string, MappedSuperClassWithProperties>
    embeddableTypeMap: Map<string, EmbeddableTypeWithProperties>
    enumerationMap: Map<string, Enumeration>
    associationMap: Map<string, {association: AssociationIdOnly, labelPosition: LabelPosition}>

    types: TypeSelectPair[]
}

type EntityWithInheritInfo = EntityWithCategorizedProperties & {
    allExtends: Set<MappedSuperClassWithCategorizedProperties>,
    allProperties: Property[],
    allCategorizedProperties: EntityCategorizedProperties,
}

type MappedSuperClassWithInheritInfo = MappedSuperClassWithCategorizedProperties & {
    allExtends: Set<MappedSuperClassWithCategorizedProperties>,
    allProperties: Property[],
    allCategorizedProperties: CategorizedProperties,
}

type EmbeddableTypeWithFlatProperties = EmbeddableTypeWithCategorizedProperties & {
    allProperties: EmbeddableTypeProperty[],
    allCategorizedProperties: CategorizedEmbeddableTypeProperties,
}

type ModelContext = {
    model: Model
    groupMap: Map<string, GroupWithSubMaps>
    entityMap: Map<string, EntityWithInheritInfo>
    mappedSuperClassMap: Map<string, MappedSuperClassWithInheritInfo>
    embeddableTypeMap: Map<string, EmbeddableTypeWithFlatProperties>
    enumerationMap: Map<string, Enumeration>
    associationMap: Map<string, Association>
}
