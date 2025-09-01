export default {
    fileName: 'IdProperty.d.ts',
    content: `type IdProperty = {
    category: "id"
    rawType: string
    nullable: false
    GeneratedValue: {
        type: "IDENTITY"
    } | {
        type: "SEQUENCE"
        sequenceName: string
    } | {
        type: "UUID"
    } | {
        type: "CustomerIdGenerator",
        generatorName: string
    }
} & Omit<BaseProperty, 'nullable'> & (ColumnProperty | EmbeddableProperty)`,
}
