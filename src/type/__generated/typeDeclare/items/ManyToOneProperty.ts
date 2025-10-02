export default Object.freeze({
    fileName: 'ManyToOneProperty.d.ts',
    content: `type ManyToOneProperty = {
    category: "ManyToOne"
    joinInfo: SingleColumnJoinInfo | MultiColumnJoinInfo | SingleColumnMidTableJoinInfo | MultiColumnMidTableJoinInfo
    onDissociateAction: OnDissociationAction
} & BaseProperty & BaseAssociationProperty`,
})
