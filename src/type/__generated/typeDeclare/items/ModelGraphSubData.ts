export default Object.freeze({
    fileName: 'ModelGraphSubData.d.ts',
    content: `type ModelGraphSubData = {
    groups: Group[]
    entities: {data: EntityWithProperties, position: Position}[]
    mappedSuperClasses: {data: MappedSuperClassWithProperties, position: Position}[]
    embeddableTypes: {data: EmbeddableTypeWithProperties, position: Position}[]
    enumerations: {data: Enumeration, position: Position}[]
    associations: {data: AssociationIdOnly, labelPosition: LabelPosition}[]
}`,
})
