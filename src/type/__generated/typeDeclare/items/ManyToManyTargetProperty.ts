export default {
    fileName: 'ManyToManyTargetProperty.d.ts',
    content: `type ManyToManyTargetProperty = {
    category: "ASSOCIATION_ManyToMany_Target"
    associationId: string
    idView: {
        name: string
    }
    mappedBy: string
    nullable: false
    typeIsList: true
} & Omit<BaseProperty, 'nullable'> & EntityTypeProperty`,
}
