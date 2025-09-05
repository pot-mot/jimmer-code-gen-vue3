export default Object.freeze({
    fileName: 'ManyToManySourceProperty.d.ts',
    content: `type ManyToManySourceProperty = {
    category: "ASSOCIATION_ManyToMany_Source"
    nullable: false
    typeIsList: true
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty`,
})
