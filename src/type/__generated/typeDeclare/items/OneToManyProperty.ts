export default Object.freeze({
    fileName: 'OneToManyProperty.d.ts',
    content: `type OneToManyProperty = {
    category: "OneToMany"
    typeIsList: true
    mappedById: string
    nullable: false
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty`,
})
