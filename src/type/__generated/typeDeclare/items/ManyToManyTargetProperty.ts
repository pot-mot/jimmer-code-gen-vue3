export default Object.freeze({
    fileName: 'ManyToManyTargetProperty.d.ts',
    content: `type ManyToManyTargetProperty = {
    category: "ASSOCIATION_ManyToMany_Target"
    mappedBy: string
    nullable: false
    typeIsList: true
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty`,
})
