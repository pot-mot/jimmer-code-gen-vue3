export default Object.freeze({
    fileName: 'ManyToManySourceProperty.d.ts',
    content: `type ManyToManySourceProperty = {
    category: "ManyToMany_Source"
    typeIsList: true
    joinInfo: SingleColumnMidTableJoinInfo | MultiColumnMidTableJoinInfo
    nullable: false
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty`,
})
