export default Object.freeze({
    fileName: 'TableToEntity.d.ts',
    content: `type TableToEntity = (
    tables: DeepReadonly<Table[]>,
    context: DeepReadonly<ModelContext>
) => {
    groups: Group[],
    entities: EntityWithProperties[],
    mappedSuperClasses: MappedSuperClassWithProperties[],
    embeddableTypes: EmbeddableTypeWithProperties[],
    enumerations: Enumeration[],
    associations: Association[],
}`,
})
