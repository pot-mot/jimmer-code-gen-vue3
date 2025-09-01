export default {
    fileName: 'EmbeddableType.d.ts',
    content: `type EmbeddableType = {
    id: string
    package: string
    name: string
    comment: string
    extraImports: string[]
    extraAnnotations: string[]
    properties: EmbeddableTypeProperty[]
}`,
}
