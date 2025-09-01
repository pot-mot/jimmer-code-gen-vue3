export default {
    fileName: 'Enumeration.d.ts',
    content: `type Enumeration = {
    id: string
    package: string
    name: string
    comment: string
    extraImports: string[]
    extraAnnotations: string[]
    strategy: EnumerationStrategy
    items: EnumerationItem[]
}`,
}
