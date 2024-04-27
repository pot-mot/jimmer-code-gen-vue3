export const jsonStrPrettyFormat = (text: string): string => {
    const obj = JSON.parse(text)
    return jsonPrettyFormat(obj)
}

export const jsonPrettyFormat = (obj: object) => {
    return JSON.stringify(obj, null, '    ')
}

export const jsonStrCompress = (text: string): string => {
    const obj = JSON.parse(text)
    return JSON.stringify(obj)
}
