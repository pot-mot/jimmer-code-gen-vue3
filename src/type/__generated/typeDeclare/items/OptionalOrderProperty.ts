export default Object.freeze({
    fileName: 'OptionalOrderProperty.d.ts',
    content: `type OptionalOrderProperty = {
    orderedProperty: false
} | {
    orderedProperty: true,
    orderDirection: "ASC" | "DESC"
}`,
})
