export default Object.freeze({
    fileName: 'OneToOneTargetProperty.d.ts',
    content: `type OneToOneTargetProperty = {
    category: "ASSOCIATION_OneToOne_Target"
    mappedById: string
    nullable: true
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty`,
})
