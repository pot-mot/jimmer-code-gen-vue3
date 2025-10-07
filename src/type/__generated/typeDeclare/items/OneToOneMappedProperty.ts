export default Object.freeze({
    fileName: 'OneToOneMappedProperty.d.ts',
    content: `type OneToOneMappedProperty = {
    category: "OneToOne_Mapped"
    typeIsList: false
    mappedById: string
    nullable: true
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty`,
})
