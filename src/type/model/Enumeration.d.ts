type EnumerationStrategy = "NAME" | "ORDINAL"

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
    groupId: string
    subPackagePath: string
    name: string
    comment: string
    extraImports: string[]
    extraAnnotations: string[]
    strategy: EnumerationStrategy
    items: EnumerationItem[]
}
