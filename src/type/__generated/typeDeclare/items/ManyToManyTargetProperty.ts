export default {
    fileName: 'ManyToManyTargetProperty.d.ts',
    content: `type ManyToManyTargetProperty = {
    category: "ManyToMany_Target"
    associationName: string
    idView: {
        name: string
    }
    mappedBy: string
    nullable: false
    typeIsList: true
} & Omit<BaseProperty, 'nullable'> & EntityTypeProperty`,
}
