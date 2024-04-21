export const matchByKeywords = <T extends {
    [key: string]: any
}>(target: T, keywords: string[], props: Array<keyof T> = ['name', 'comment']): boolean => {
    for (let keyword of keywords) {
        for (let prop of props) {
            if (target[prop].includes(keyword)) {
                return true
            }
        }
    }
    return false
}
