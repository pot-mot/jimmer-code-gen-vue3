export const jsonFormatter = (text: string): string => {
    try {
        const obj = JSON.parse(text)
        return JSON.stringify(obj, null, '    ')
    } catch (e) {
        return text
    }
}

export const jsonParser = (text: string): string => {
    try {
        const obj = JSON.parse(text)
        return JSON.stringify(obj)
    } catch (e) {
        return text
    }
}
