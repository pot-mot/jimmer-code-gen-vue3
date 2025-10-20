export default Object.freeze({
    fileName: 'OneToOneMappedProperty.d.ts',
    content: `type OneToOneMappedProperty = {
    category: "OneToOne_Mapped"
    typeIsList: false
    mappedById: string
    nullable: true
    nameTemplate: string
    useNameTemplate: boolean
    commentTemplate: string
    useCommentTemplate: boolean
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty`,
})
