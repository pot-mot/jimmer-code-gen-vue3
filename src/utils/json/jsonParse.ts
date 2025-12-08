import JSON5 from 'json5'

export const json5Parse = (text: string) => {
    return JSON5.parse(text)
}