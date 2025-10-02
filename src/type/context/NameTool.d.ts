type NameTool = {
    firstCaseToLower(name: string): string
    firstCaseToUpper(name: string): string

    splitUpperCamel(name: string): string[]
    splitLowerCamel(name: string): string[]
    splitSnake(name: string): string[]
    splitKebab(name: string): string[]
    toCamel(parts: string[]): string
    toPascal(parts: string[]): string
    toSnake(parts: string[]): string
    toKebab(parts: string[]): string

    convert(
        name: string,
        currentStrategy: NameStrategy,
        resultStrategy: NameStrategy
    ): string
}
