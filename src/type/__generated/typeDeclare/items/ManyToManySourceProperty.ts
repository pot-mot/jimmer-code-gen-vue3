export default {
    fileName: 'ManyToManySourceProperty.d.ts',
    content: `type ManyToManySourceProperty = {
    category: "ManyToMany_Source"
    associationName: string
    idView: {
        name: string
    }
    nullable: false
    typeIsList: true
} & Omit<BaseProperty, 'nullable'> & EntityTypeProperty & (
    ({
        joinTableName: string
        joinColumnName: string
        inverseJoinColumnName: string
    } & ColumnProperty) |
    ({
        joinTableName: string
        joinColumns: {
            joinColumnName: string
            inverseJoinColumnName: string
        }[]
    } & EmbeddableProperty)
    )`,
}
