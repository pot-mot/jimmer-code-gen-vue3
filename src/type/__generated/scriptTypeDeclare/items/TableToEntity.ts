export default Object.freeze({
    fileName: 'TableToEntity.d.ts',
    content: `type TableToEntity = (
    tables: DeepReadonly<Table[]>,
    context: DeepReadonly<ModelContext>
) => {
    entities: EntityWithProperties[],
    associations: Association[],
}`,
})
