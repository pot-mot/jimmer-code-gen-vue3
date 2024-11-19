export const matchStrByKeywords = (
    target: string,
    keywords: string[],
    selectType: 'AND' | 'OR' = 'AND'
): boolean => {
    const searchItem = target.toLowerCase()

    for (const keyword of keywords) {
        if (searchItem.includes(keyword.toLowerCase())) {
            if (selectType === 'OR') return true
        } else {
            if (selectType === 'AND') return false
        }
    }

    return selectType === 'AND'
}

export const matchByKeywords = <T extends {
    [key: string]: any
}>(
    target: T,
    keywords: string[],
    props: Array<keyof T> = ['name', 'comment'],
    selectType: 'AND' | 'OR' = 'AND'
): boolean => {
    const searchValues = []
    for (const prop of props) {
        const value = target[prop]
        searchValues.push(value)
    }
    const searchItem = searchValues.join('')

    return matchStrByKeywords(searchItem, keywords, selectType)
}
