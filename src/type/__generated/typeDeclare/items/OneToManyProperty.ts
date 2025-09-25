export default Object.freeze({
    fileName: 'OneToManyProperty.d.ts',
    content: `type OneToManyProperty = {
    category: "OneToMany"
    mappedById: string
    nullable: false
    typeIsList: true
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty`,
})
