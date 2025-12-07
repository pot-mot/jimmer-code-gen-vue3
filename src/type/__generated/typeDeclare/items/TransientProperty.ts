export default Object.freeze({
    fileName: 'TransientProperty.d.ts',
    content: `type TransientProperty = {
    category: "TRANSIENT"
} & BaseProperty & (
    | ({
        rawType: string
    }  & (
        | {}
        | { resolver: string }
        | { resolverRef: string }
    ))
    | ({
        referencedEntityId: string
        typeIsList: boolean
    } & (
        | { resolver: string }
        | { resolverRef: string }
    ))
)`,
})
