export default Object.freeze({
    fileName: 'ModelSubData.d.ts',
    content: `type ModelSubData = {
    groups: GroupWithSubData[]
    entities: EntityWithCategoryProperties[]
    mappedSuperClasses: MappedSuperClassWithCategoryProperties[]
    embeddableTypes: EmbeddableTypeWithCategoryProperties[]
    enumerations: Enumeration[]
    associations: AssociationWithSubData[]
}`,
})
