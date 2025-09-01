export default {
    fileName: 'ManyToOneProperty.d.ts',
    content: `type ManyToOneProperty = {
    category: "ManyToOne"
    associationId: string
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
