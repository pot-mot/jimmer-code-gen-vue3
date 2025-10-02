export default Object.freeze({
    fileName: 'TableToEntity.d.ts',
    content: `type TableToEntity = (
    groupId: string,
    tables: DeepReadonly<Table[]>,
    context: DeepReadonly<ModelContext>
) => {
    entities: EntityWithProperties[],
    embeddableTypes: EmbeddableTypeWithProperties[],
    associations: AssociationIdOnly[],
}`,
})
