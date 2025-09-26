export default Object.freeze({
    fileName: 'OneToOneMappedProperty.d.ts',
    content: `type OneToOneMappedProperty = {
    category: "OneToOne_Mapped"
    mappedById: string
    nullable: true
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty`,
})
