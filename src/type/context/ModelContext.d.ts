type ModelContextData = {
    model: Model
    groupMap: Map<string, Group>
    entityMap: Map<string, EntityWithProperties>
    mappedSuperClassMap: Map<string, MappedSuperClassWithProperties>
    embeddableTypeMap: Map<string, EmbeddableTypeWithProperties>
    enumerationMap: Map<string, Enumeration>
    associationMap: Map<string, EdgedAssociation>
}

type EntityInheritInfo = {
    directExtends: Set<MappedSuperClassWithCategorizedProperties>,
    allExtends: Set<MappedSuperClassWithCategorizedProperties>
    allProperties: Property[]
}
type EntityWithInheritInfo = Omit<EntityWithCategorizedProperties, 'properties'> & {
    properties: Property[]
} & EntityInheritInfo

type MappedSuperClassInheritInfo = {
    directExtends: Set<MappedSuperClassWithCategorizedProperties>,
    allExtends: Set<MappedSuperClassWithCategorizedProperties>,
    allProperties: Property[],
}
type MappedSuperClassWithInheritInfo = Omit<MappedSuperClassWithCategorizedProperties, 'properties'> & {
    properties: Property[]
} & MappedSuperClassInheritInfo

type EmbeddableTypeOverrideProperties = {
    overrideColumnNameProperties: EmbeddableTypeProperty[],
    categorizedOverrideColumnNameProperties: CategorizedEmbeddableTypeProperties,
}
type EmbeddableTypeWithOverrideProperties = EmbeddableTypeWithCategorizedProperties & EmbeddableTypeOverrideProperties

type GroupInheritInfoMap = {
    entityMap: Map<string, EntityWithInheritInfo>
    mappedSuperClassMap: Map<string, MappedSuperClassWithInheritInfo>
    embeddableTypeMap: Map<string, EmbeddableTypeWithProperties>
    enumerationMap: Map<string, Enumeration>
}
type GroupWithInheritInfoMap = Group & GroupInheritInfoMap

type ModelContext = {
    model: Model
    groupMap: Map<string, GroupWithInheritInfoMap>
    entityMap: Map<string, EntityWithInheritInfo>
    mappedSuperClassMap: Map<string, MappedSuperClassWithInheritInfo>
    embeddableTypeMap: Map<string, EmbeddableTypeWithOverrideProperties>
    enumerationMap: Map<string, Enumeration>
    associationMap: Map<string, Association>

    createId: (type: "Model" | "Entity" | "Property" | "MappedSuperClass" | "EmbeddableType" | "Enumeration" | "EnumerationItem" | "Association" | "Group") => string
    nameTool: NameTool
    typeTool: TypeTool
}
