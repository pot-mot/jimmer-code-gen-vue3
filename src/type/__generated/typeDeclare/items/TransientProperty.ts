export default {
    fileName: 'TransientProperty.d.ts',
    content: `type TransientProperty = {
    category: "Transient"
    resolver?: string
} & BaseProperty & (
    { rawType: string } |
    EntityTypeProperty
    )`,
}
