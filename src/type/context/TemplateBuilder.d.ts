type TemplateOptions = {
    indent: string
    scope: {
        start: string,
        end: string
    }
}

type TemplateBuildOptions = {
    cleanEmptyLineIndent: boolean
}

type TemplateBuilder = {
    startScope: (start?: string) => void
    endScope: (end?: string) => void
    append: (content: string) => void
    appendLine: (line?: string) => void
    appendBlock: (block: string | Iterable<string>) => void
    build: (option?: Partial<TemplateBuildOptions>) => string
    clean: () => void
}
