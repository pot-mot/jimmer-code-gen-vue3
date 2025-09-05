export default Object.freeze({
    fileName: 'EntityToTable.d.ts',
    content: `type EntityToTable = (
    entity: DeepReadonly<Entity>,
    context: DeepReadonly<ModelContext>
) => Table`,
})
