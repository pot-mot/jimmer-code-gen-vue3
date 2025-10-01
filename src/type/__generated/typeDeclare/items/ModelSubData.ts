export default Object.freeze({
    fileName: 'ModelSubData.d.ts',
    content: `type ModelSubData = {
    groups: Group[]
    entities: EntityWithProperties[]
    mappedSuperClasses: MappedSuperClassWithProperties[]
    embeddableTypes: EmbeddableTypeWithProperties[]
    enumerations: Enumeration[]
    associations: {association: AssociationIdOnly, labelPosition: LabelPosition}[]
}`,
})
