export default Object.freeze({
    fileName: 'OneToOneSourceProperty.d.ts',
    content: `type OneToOneSourceProperty = {
    category: "OneToOne_Source"
    typeIsList: false
    joinInfo: SingleColumnJoinInfo | MultiColumnJoinInfo | SingleColumnMidTableJoinInfo | MultiColumnMidTableJoinInfo
    autoGenerateJoinInfo: boolean
    onDissociateAction: OnDissociationAction
} & BaseProperty & BaseAssociationProperty`,
})
