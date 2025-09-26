export default Object.freeze({
    fileName: 'ManyToManyMappedProperty.d.ts',
    content: `type ManyToManyMappedProperty = {
    category: "ManyToMany_Mapped"
    mappedById: string
    nullable: false
    typeIsList: true
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty`,
})
