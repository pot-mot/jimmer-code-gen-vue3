export default {
    fileName: 'EmbeddableType.d.ts',
    content: `type EmbeddableType = {
    package: string
    name: string
    extraImports: string[]
    extraAnnotations: string[]
    properties: EmbeddableTypeProperty[]
}`,
}
