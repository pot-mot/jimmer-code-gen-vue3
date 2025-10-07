export default Object.freeze({
    fileName: 'ManyToManyMappedProperty.d.ts',
    content: `type ManyToManyMappedProperty = {
    category: "ManyToMany_Mapped"
    typeIsList: true
    mappedById: string
    nullable: false
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty`,
})
