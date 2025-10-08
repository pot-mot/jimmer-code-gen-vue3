type NameTool = {
    firstCaseToLower(name: string): string
    firstCaseToUpper(name: string): string

    splitCamel(name: string): string[]
    splitSnake(name: string): string[]
    splitKebab(name: string): string[]
    toUpperCamel(parts: string[]): string
    toLowerCamel(parts: string[]): string
    toUpperSnake(parts: string[]): string
    toLowerSnake(parts: string[]): string
    toUpperKebab(parts: string[]): string
    toLowerKebab(parts: string[]): string

    convert(
        name: string,
        currentStrategy: NameStrategy,
        resultStrategy: NameStrategy
    ): string
}
