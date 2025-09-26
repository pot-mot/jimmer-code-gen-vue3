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
    idProperty?: IdProperty
    oneToOneSourcePropertyMap: Map<string, OneToOneSourceProperty & {association: OneToOneAbstractAssociation}>
    manyToOnePropertyMap: Map<string, ManyToOneProperty & {association: ManyToOneAbstractAssociation}>
}`,
})
