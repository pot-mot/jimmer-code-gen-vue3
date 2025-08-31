export default {
    fileName: 'ManyToOneProperty.d.ts',
    content: `type ManyToOneProperty = {
    category: "ManyToOne"
    associationName: string
    idView: {
        name: string
    }
    onDissociateAction: OnDissociationAction
} & BaseProperty & EntityTypeProperty & (
    ({
        joinColumnName: string
    } & ColumnProperty) |
    ({
        joinColumnNames: string[]
    } & EmbeddableProperty)
    )`,
}
