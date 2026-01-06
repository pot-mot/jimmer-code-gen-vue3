const objectRegistry = new WeakMap<object, string>();
let objectIdCounter = 0;

export const commonDiffKey = (value: any): string => {
    if (value === null) {
        return ' null '
    } else if (value === undefined) {
        return ' undefined '
    } else if (Array.isArray(value)) {
        let key: string | undefined = objectRegistry.get(value)
        if (key === undefined) {
            key = ` array:[${value.map(commonDiffKey).join(',')}] `
            objectRegistry.set(value, key);
        }
        return key;
    } else if (typeof value === 'object' || typeof value === 'function') {
        let key: string | undefined = objectRegistry.get(value)
        if (key === undefined) {
            key = ` obj:${++objectIdCounter} `
            objectRegistry.set(value, key);
        }
        return key;
    } else if (typeof value === "string") {
        return ` str:${value.replace(' ', '[blk]')} `
    } else if (typeof value === "number") {
        return ` num:${value} `
    } else if (typeof value === "boolean") {
        return ` bool:${value} `
    } else if (typeof value === "symbol") {
        return ` sym:${value.toString()} `
    } else if (typeof value === "bigint") {
        return ` big:${value} `
    }

    return String(value)
};
