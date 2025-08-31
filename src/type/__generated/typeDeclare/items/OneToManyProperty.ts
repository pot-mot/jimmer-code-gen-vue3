export default {
    fileName: 'OneToManyProperty.d.ts',
    content: `type OneToManyProperty = {
    category: "OneToMany"
    associationName: string
    idView: {
        name: string
    }
    mappedBy: string
    nullable: false
    typeIsList: true
} & Omit<BaseProperty, 'nullable'> & EntityTypeProperty`,
}
