export default {
    fileName: 'OneToManyProperty.d.ts',
    content: `type OneToManyProperty = {
    category: "ASSOCIATION_OneToMany"
    mappedBy: string
    nullable: false
    typeIsList: true
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty`,
}
