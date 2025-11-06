type TemplateOptions = {
    indent: string
    scope: {
        start: string,
        end: string
    }
}

type TemplateBuilder = {
    startScope: (start?: string) => void
    endScope: (end?: string) => void
    append: (block: string | Iterable<string>) => void
    build: () => string
}
