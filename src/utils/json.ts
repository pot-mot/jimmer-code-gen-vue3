export const jsonStrFormat = (text: string): string => {
    const obj = JSON.parse(text)
    return JSON.stringify(obj, null, '    ')
}

export const jsonFormat = (obj: object): string => {
    return JSON.stringify(obj, null, '    ')
}

export const jsonStrCompress = (text: string): string => {
    const obj = JSON.parse(text)
    return JSON.stringify(obj)
}
