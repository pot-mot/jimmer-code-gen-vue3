export default Object.freeze({
    fileName: 'ManyToOneProperty.d.ts',
    content: `type ManyToOneProperty = {
    category: "ManyToOne"
    typeIsList: false
    joinInfo: SingleColumnJoinInfo | MultiColumnJoinInfo | SingleColumnMidTableJoinInfo | MultiColumnMidTableJoinInfo
    autoGenerateJoinInfo: boolean
    onDissociateAction: OnDissociationAction
} & BaseProperty & BaseAssociationProperty`,
})
