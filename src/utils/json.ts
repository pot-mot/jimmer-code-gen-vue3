export const jsonFormatter = (text: string): string => {
    const obj = JSON.parse(text)
    return JSON.stringify(obj, null, '    ')
}

export const jsonParser = (text: string): string => {
    const obj = JSON.parse(text)
    return JSON.stringify(obj)
}
