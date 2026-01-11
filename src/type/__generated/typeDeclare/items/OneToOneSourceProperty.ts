export default Object.freeze({
    fileName: 'OneToOneSourceProperty.d.ts',
    content: `type OneToOneSourceProperty = {
    category: "OneToOne_Source"
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
