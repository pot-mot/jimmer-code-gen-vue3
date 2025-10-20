export default Object.freeze({
    fileName: 'ManyToManyMappedProperty.d.ts',
    content: `type ManyToManyMappedProperty = {
    category: "ManyToMany_Mapped"
    typeIsList: true
    mappedById: string
    nullable: false
    nameTemplate: string
    useNameTemplate: boolean
    commentTemplate: string
    useCommentTemplate: boolean
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty`,
})
