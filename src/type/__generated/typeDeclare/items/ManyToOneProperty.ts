export default {
    fileName: 'ManyToOneProperty.d.ts',
    content: `type ManyToOneProperty = {
    category: "ASSOCIATION_ManyToOne"
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
