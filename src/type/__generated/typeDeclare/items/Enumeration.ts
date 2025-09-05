export default Object.freeze({
    fileName: 'Enumeration.d.ts',
    content: `type Enumeration = {
    id: string
    groupId: string
    subPackagePath: string
    name: string
    comment: string
    extraImports: string[]
    extraAnnotations: string[]
    strategy: EnumerationStrategy
    items: EnumerationItem[]
}`,
})
