export default Object.freeze({
    fileName: 'ManyToManySourceProperty.d.ts',
    content: `type ManyToManySourceProperty = {
    category: "ManyToMany_Source"
    joinInfo: SingleColumnMidTableJoinInfo | MultiColumnMidTableJoinInfo
    nullable: false
    typeIsList: true
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty`,
})
