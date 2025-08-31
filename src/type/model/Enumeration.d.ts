type EnumerationStrategy = "DEFAULT" | "NAME" | "ORDINAL"

type EnumerationItem = {
    id: string
    name: string
    ordinal: number
    comment: string
    extraImports: string[]
    extraAnnotations: string[]
}

type Enumeration = {
    id: string
    package: string
    name: string
    comment: string
    extraImports: string[]
    extraAnnotations: string[]
    strategy: EnumerationStrategy
    items: EnumerationItem[]
}
