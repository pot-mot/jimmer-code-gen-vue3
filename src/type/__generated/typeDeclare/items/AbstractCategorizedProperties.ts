export default Object.freeze({
    fileName: 'AbstractCategorizedProperties.d.ts',
    content: `type AbstractCategorizedProperties = Omit<EntityCategorizedProperties,
    | "idProperty"
    | "oneToOneSourcePropertyMap"
    | "oneToOneMappedPropertyMap"
    | "manyToOnePropertyMap"
    | "oneToManyPropertyMap"
    | "manyToManySourcePropertyMap"
    | "manyToManyMappedPropertyMap"
> & {
    idProperty?: IdCommonProperty | IdEmbeddableProperty
    oneToOneSourcePropertyMap: Map<string, OneToOneSourceProperty & {association: OneToOneAbstractAssociationIdOnly}>
    manyToOnePropertyMap: Map<string, ManyToOneProperty & {association: ManyToOneAbstractAssociationIdOnly}>
}`,
})
