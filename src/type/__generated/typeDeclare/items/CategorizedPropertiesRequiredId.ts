export default Object.freeze({
    fileName: 'CategorizedPropertiesRequiredId.d.ts',
    content: `type CategorizedPropertiesRequiredId = Omit<CategorizedProperties, "idProperty"> & {
    idProperty: IdProperty
}`,
})
