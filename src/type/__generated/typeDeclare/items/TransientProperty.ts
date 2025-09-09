export default Object.freeze({
    fileName: 'TransientProperty.d.ts',
    content: `type TransientProperty = {
    category: "TRANSIENT"
} & BaseProperty & ({
    rawType: string
} | {
    referenceEntityId: string
    resolver: string
    typeIsList: boolean
})`,
})
