import {firstCaseToLower, firstCaseToUpper} from "@/utils/name/firstCase.ts";

export const nameTool: NameTool = {
    firstCaseToLower,
    firstCaseToUpper,

    splitCamel: (name: string): string[] => {
        const parts: string[] = []
        let currentPart: string[] = []


        for (let i = 0; i < name.length; i++) {
            const char = name[i]
            if (!char) continue

            // 检查是否为大写字母
            if (char >= 'A' && char <= 'Z') {
                const currentPartNotEmpty = currentPart.length > 0

                let lastCharIsLowercase = false
                const lastChar = currentPart[currentPart.length - 1]
                if (lastChar !== undefined) {
                    lastCharIsLowercase = lastChar >= 'a' && lastChar <= 'z'
                }
                let nextCharIsLowercase = false
                const nextChar = name[i + 1]
                if (nextChar !== undefined) {
                    nextCharIsLowercase = nextChar >= 'a' && nextChar <= 'z'
                }

                // 如果当前部分最后一个字符是小写字母，或者当前部分末尾是大写但下一个字符是小写
                if (currentPartNotEmpty && (lastCharIsLowercase || nextCharIsLowercase)) {
                    parts.push(currentPart.join(''))
                    currentPart = [char]
                } else {
                    currentPart.push(char)
                }
            } else {
                currentPart.push(char)
            }
        }

        if (currentPart.length > 0) {
            parts.push(currentPart.join(''))
        }

        return parts;
    },

    splitSnake: (name: string): string[] => {
        return name.split('_')
    },

    splitKebab: (name: string): string[] => {
        return name.split('-')
    },

    toUpperCamel(parts: string[]): string {
        return parts.map(part =>
            part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        ).join('')
    },
    toLowerCamel(parts: string[]): string {
        if (parts.length === 0 || !parts[0]) return ''
        return parts[0].toLowerCase() + parts.slice(1).map(part =>
            part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        ).join('')
    },

    toUpperSnake(parts: string[]): string {
        return parts.map(part => part.toUpperCase()).join('_')
    },
    toLowerSnake(parts: string[]): string {
        return parts.map(part => part.toLowerCase()).join('_')
    },

    toUpperKebab(parts: string[]): string {
        return parts.map(part => part.toUpperCase()).join('-')
    },
    toLowerKebab(parts: string[]): string {
        return parts.map(part => part.toLowerCase()).join('-')
    },

    convert: (name: string, currentStrategy: NameStrategy, resultStrategy: NameStrategy): string => {
        let parts: string[]
        switch (currentStrategy) {
            case 'UPPER_CAMEL':
            case 'LOWER_CAMEL':
                parts = nameTool.splitCamel(name)
                break
            case 'UPPER_SNAKE':
            case 'LOWER_SNAKE':
                parts = nameTool.splitSnake(name)
                break
            case 'UPPER_KEBAB':
            case 'LOWER_KEBAB':
                parts = nameTool.splitKebab(name)
                break
        }

        switch (resultStrategy) {
            case 'UPPER_CAMEL':
                return nameTool.toUpperCamel(parts)
            case 'LOWER_CAMEL':
                return nameTool.toLowerCamel(parts)
            case 'UPPER_SNAKE':
                return nameTool.toUpperSnake(parts)
            case 'LOWER_SNAKE':
                return nameTool.toLowerSnake(parts)
            case 'UPPER_KEBAB':
                return nameTool.toUpperKebab(parts)
            case 'LOWER_KEBAB':
                return nameTool.toLowerKebab(parts)
        }
    }
}
