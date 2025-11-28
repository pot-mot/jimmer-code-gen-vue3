export default Object.freeze({
    fileName: 'OneToOneSourceProperty.d.ts',
    content: `type OneToOneSourceProperty = {
    category: "OneToOne_Source"
    typeIsList: false
    autoGenerateJoinInfo: boolean
    onDissociateAction: OnDissociationAction
} & ({ joinInfo: FkJoinInfo, nullable: boolean } | { joinInfo: MidTableJoinInfo, nullable: true })
    & Omit<BaseProperty, 'nullable'>
    & BaseAssociationProperty
    & ({} | KeyProperty)`,
})
