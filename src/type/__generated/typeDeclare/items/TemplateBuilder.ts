export default Object.freeze({
    fileName: 'TemplateBuilder.d.ts',
    content: `type TemplateBuilder = {
    startScope: (start?: string) => void
    endScope: (end?: string) => void
    append: (block: string | Iterable<string>) => void
    build: () => string
}`,
})
