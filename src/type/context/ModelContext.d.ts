type ModelContextData = {
    model: Model
    groupMap: Map<string, Group>
    entityMap: Map<string, EntityWithProperties>
    mappedSuperClassMap: Map<string, MappedSuperClassWithProperties>
    embeddableTypeMap: Map<string, EmbeddableTypeWithProperties>
    enumerationMap: Map<string, Enumeration>
    associationMap: Map<string, {association: AssociationIdOnly, labelPosition: LabelPosition}>
}

type EntityInheritInfo = {
    allExtends: Set<MappedSuperClassWithCategorizedProperties>,
    allProperties: Property[],
    allCategorizedProperties: EntityCategorizedProperties,
}
type EntityWithInheritInfo = EntityWithCategorizedProperties & EntityInheritInfo

type MappedSuperClassInheritInfo = {
    allExtends: Set<MappedSuperClassWithCategorizedProperties>,
    allProperties: Property[],
    allCategorizedProperties: CategorizedProperties,
}
type MappedSuperClassWithInheritInfo = MappedSuperClassWithCategorizedProperties & MappedSuperClassInheritInfo

type EmbeddableTypeOverrideProperties = {
    overrideColumnNameProperties: EmbeddableTypeProperty[],
    categorizedOverrideColumnNameProperties: CategorizedEmbeddableTypeProperties,
}
type EmbeddableTypeWithOverrideProperties = EmbeddableTypeWithCategorizedProperties & EmbeddableTypeOverrideProperties

type ModelContext = {
    model: Model
    groupMap: Map<string, GroupWithSubMaps>
    entityMap: Map<string, EntityWithInheritInfo>
    mappedSuperClassMap: Map<string, MappedSuperClassWithInheritInfo>
    embeddableTypeMap: Map<string, EmbeddableTypeWithOverrideProperties>
    enumerationMap: Map<string, Enumeration>
    associationMap: Map<string, Association>

    createId: (type: "Model" | "Entity" | "Property" | "MappedSuperClass" | "EmbeddableType" | "Enumeration" | "EnumerationItem" | "Association" | "Group") => string
    nameTool: NameTool
    typeTool: TypeTool
}
