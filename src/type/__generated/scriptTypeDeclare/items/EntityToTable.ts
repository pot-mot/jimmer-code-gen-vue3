export default Object.freeze({
    fileName: 'EntityToTable.d.ts',
    content: `type EntityToTable = (
    entities: DeepReadonly<EntityWithInheritInfo[]>,
    context: DeepReadonly<ModelContext>
) => {
    tables: Table[],
    midTables: Table[]
}`,
})
