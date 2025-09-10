export default Object.freeze({
    fileName: 'EntityToTable.d.ts',
    content: `type EntityToTable = (
    entity: DeepReadonly<EntityWithInheritInfo>,
    context: DeepReadonly<ModelContext>
) => Table`,
})
