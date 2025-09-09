export default Object.freeze({
    fileName: 'CategoryPropertiesRequiredId.d.ts',
    content: `type CategoryPropertiesRequiredId = Omit<CategoryProperties, "idProperty"> & {
    idProperty: IdProperty
}`,
})
