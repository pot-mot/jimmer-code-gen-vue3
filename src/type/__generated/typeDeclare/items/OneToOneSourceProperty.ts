export default Object.freeze({
    fileName: 'OneToOneSourceProperty.d.ts',
    content: `type OneToOneSourceProperty = {
    category: "OneToOne_Source"
    typeIsList: false
    joinInfo: JoinInfo
    autoGenerateJoinInfo: boolean
    onDissociateAction: OnDissociationAction
} & BaseProperty & BaseAssociationProperty
    & ({} | KeyProperty)`,
})
