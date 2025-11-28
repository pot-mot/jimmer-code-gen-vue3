export default Object.freeze({
    fileName: 'ManyToOneProperty.d.ts',
    content: `type ManyToOneProperty = {
    category: "ManyToOne"
    typeIsList: false
    autoGenerateJoinInfo: boolean
    onDissociateAction: OnDissociationAction
} & ({ joinInfo: FkJoinInfo, nullable: boolean } | { joinInfo: MidTableJoinInfo, nullable: true })
    & Omit<BaseProperty, 'nullable'>
    & BaseAssociationProperty
    & ({} | KeyProperty)`,
})
