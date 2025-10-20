export default Object.freeze({
    fileName: 'OneToManyProperty.d.ts',
    content: `type OneToManyProperty = {
    category: "OneToMany"
    typeIsList: true
    mappedById: string
    nullable: false
    nameTemplate: string
    useNameTemplate: boolean
    commentTemplate: string
    useCommentTemplate: boolean
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty`,
})
