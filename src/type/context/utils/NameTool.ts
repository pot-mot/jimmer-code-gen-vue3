import {firstCaseToLower, firstCaseToUpper} from "@/utils/name/firstCase.ts";

export const nameTool: NameTool = {
    firstCaseToLower,
    firstCaseToUpper,

    splitUpperCamel: (name: string): string[] => {
        return name.match(/[A-Z]?[a-z]+|[A-Z]+(?=[A-Z][a-z]|$)/g) ?? []
    },

    splitLowerCamel: (name: string): string[] => {
        return name.match(/[A-Z][a-z]+|[A-Z]+(?=[A-Z][a-z]|$)/g) ?? []
    },

    splitSnake: (name: string): string[] => {
        return name.split('_')
    },

    splitKebab: (name: string): string[] => {
        return name.split('-')
    },

    toCamel(parts: string[]): string {
        if (parts.length === 0) return ''
        return parts[0].toLowerCase() + parts.slice(1).map(part =>
            part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        ).join('')
    },

    toPascal(parts: string[]): string {
        return parts.map(part =>
            part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        ).join('')
    },

    toSnake(parts: string[]): string {
        return parts.map(part => part.toLowerCase()).join('_')
    },

    toKebab(parts: string[]): string {
        return parts.map(part => part.toLowerCase()).join('-')
    },

    convert: (name: string, currentStrategy: NameStrategy, resultStrategy: NameStrategy): string => {
        let parts: string[]
        switch (currentStrategy) {
            case 'UPPER_CAMEL':
                parts = nameTool.splitUpperCamel(name)
                break
            case 'LOWER_CAMEL':
                parts = nameTool.splitLowerCamel(name)
                break
            case 'SNAKE':
                parts = nameTool.splitSnake(name)
                break
            case 'KEBAB':
                parts = nameTool.splitKebab(name)
                break
        }

        switch (resultStrategy) {
            case 'UPPER_CAMEL':
                return nameTool.toCamel(parts)
            case 'LOWER_CAMEL':
                return nameTool.toPascal(parts)
            case 'SNAKE':
                return nameTool.toSnake(parts)
            case 'KEBAB':
                return nameTool.toKebab(parts)
        }
    }
}
