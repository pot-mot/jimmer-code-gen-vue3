export default Object.freeze({
    fileName: 'ManyToOneProperty.d.ts',
    content: `type ManyToOneProperty = {
    category: "ManyToOne"
    typeIsList: false
    joinInfo: JoinInfo
    autoGenerateJoinInfo: boolean
    onDissociateAction: OnDissociationAction
} & BaseProperty & BaseAssociationProperty
    & ({} | KeyProperty)`,
})
