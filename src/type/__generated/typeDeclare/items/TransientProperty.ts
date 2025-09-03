export default {
    fileName: 'TransientProperty.d.ts',
    content: `type TransientProperty = {
    category: "TRANSIENT"
} & BaseProperty & ({
    rawType: string
} | {
    entityId: string
    resolver: string
    typeIsList: boolean
})`,
}
