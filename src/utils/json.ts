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

export const jsonSortPropStringify = (obj: object): string => {
    return JSON.stringify(obj, (_, value) => {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            return Object.keys(value).sort().reduce((sortedObj, prop) => {
                sortedObj[prop] = value[prop];
                return sortedObj;
            }, {} as Record<string, any>);
        }
        return value;
    });
}