export default Object.freeze({
    fileName: 'TransientProperty.d.ts',
    content: `type TransientProperty = {
    category: "TRANSIENT"
} & BaseProperty & ({
    rawType: string
} | {
    referencedEntityId: string
    resolver: string
    typeIsList: boolean
})`,
})
