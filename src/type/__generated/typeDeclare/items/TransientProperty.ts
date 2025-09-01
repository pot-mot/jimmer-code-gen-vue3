export default {
    fileName: 'TransientProperty.d.ts',
    content: `type TransientProperty = {
    category: "TRANSIENT"
    resolver?: string
} & BaseProperty & (
    { rawType: string } |
    EntityTypeProperty
    )`,
}
