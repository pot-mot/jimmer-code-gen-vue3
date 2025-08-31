export default {
    fileName: 'OneToOneSourceProperty.d.ts',
    content: `type OneToOneSourceProperty = {
    category: "OneToOne_Source"
    associationName: string
    idView?: {
        name: string
    }
    onDissociateAction: OnDissociationAction
} & BaseProperty & EntityTypeProperty & (ColumnProperty | EmbeddableProperty)`,
}
