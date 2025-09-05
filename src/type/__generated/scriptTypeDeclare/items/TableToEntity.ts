export default Object.freeze({
    fileName: 'TableToEntity.d.ts',
    content: `type TableToEntity = (
    tables: DeepReadonly<Table[]>,
    context: DeepReadonly<ModelContext>
) => {
    groups: Group[],
    entities: Entity[],
    mappedSuperClasses: MappedSuperClass[],
    embeddableTypes: EmbeddableType[],
    enumerations: Enumeration[],
    associations: Association[],
}`,
})
