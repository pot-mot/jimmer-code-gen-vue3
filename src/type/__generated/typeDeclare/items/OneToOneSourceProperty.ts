export default Object.freeze({
    fileName: 'OneToOneSourceProperty.d.ts',
    content: `type OneToOneSourceProperty = {
    category: "OneToOne_Source"
    joinInfo: SingleColumnJoinInfo | MultiColumnJoinInfo | SingleColumnMidTableJoinInfo | MultiColumnMidTableJoinInfo
    onDissociateAction: OnDissociationAction
} & BaseProperty & BaseAssociationProperty`,
})
