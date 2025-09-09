type Property =
    | IdProperty
    | VersionProperty
    | ScalarProperty
    | EnumProperty
    | AssociationProperty
    | ManyToManyViewProperty
    | GetterFormulaProperty
    | SqlFormulaProperty
    | TransientProperty

type Properties = {
    properties: Properties
}

type CategoryProperties = {
    idProperty?: IdProperty
    keyPropertyMap: Map<string, BaseProperty & KeyProperty>
    logicalDeletedProperty?: (BaseProperty & (ScalarLogicalDeleteProperty | EnumLogicalDeleteProperty))
    versionProperty?: VersionProperty

    scalarPropertyMap: Map<string, ScalarProperty>
    enumPropertyMap: Map<string, EnumProperty>
    associationPropertyMap: Map<string, AssociationProperty>
    manyToManyViewPropertyMap: Map<string, ManyToManyViewProperty>
    getterFormulaPropertyMap: Map<string, GetterFormulaProperty>
    sqlFormulaPropertyMap: Map<string, SqlFormulaProperty>
    transientPropertyMap: Map<string, TransientProperty>
}

type CategoryPropertiesRequiredId = Omit<CategoryProperties, "idProperty"> & {
    idProperty: IdProperty
}

type EmbeddableTypeCategoryProperties = {
    scalarPropertyMap: Map<string, ScalarProperty>
    enumPropertyMap: Map<string, EnumProperty>
}

type EntityWithProperties = Entity & Properties

type EntityWithCategoryProperties = EntityWithProperties & CategoryPropertiesRequiredId

type MappedSuperClassWithProperties = MappedSuperClass & Properties

type MappedSuperClassWithCategoryProperties = MappedSuperClassWithProperties & CategoryProperties

type EmbeddableTypeWithProperties = EmbeddableType & Properties

type EmbeddableTypeWithCategoryProperties = EmbeddableTypeWithProperties & EmbeddableTypeCategoryProperties