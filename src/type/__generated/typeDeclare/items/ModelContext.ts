export default Object.freeze({
    fileName: 'ModelContext.d.ts',
    content: `type ModelContext = {
    readonly model: Model
    readonly groupIdMap: ReadonlyMap<string, Group>
    readonly entityIdMap: ReadonlyMap<string, Entity>
    readonly mappedSuperClassIdMap: ReadonlyMap<string, MappedSuperClass>
    readonly embeddableTypeIdMap: ReadonlyMap<string, EmbeddableType>
    readonly enumerationIdMap: ReadonlyMap<string, Enumeration>
    readonly associationIdMap: ReadonlyMap<string, Association>
}`,
})
