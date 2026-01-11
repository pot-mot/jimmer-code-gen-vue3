export default Object.freeze({
    fileName: 'ManyToOneProperty.d.ts',
    content: `type ManyToOneProperty = {
    category: "ManyToOne"
    typeIsList: false
    autoGenerateJoinInfo: boolean
} & ({
    joinInfo: FkJoinInfo,
    nullable: boolean,
    onDissociateAction: OnDissociationAction
} | {
    joinInfo: MidTableJoinInfo,
    nullable: true
})
    & Omit<BaseProperty, 'nullable'>
    & BaseAssociationProperty
    & ({} | KeyProperty)`,
})
