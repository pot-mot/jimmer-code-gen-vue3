export const arrayToMap = <T> (array: T[], prop: keyof T): Map<any, T> => {
    const map = new Map<any, T>()

    for (let i = 0; i < array.length; i ++) {
        const key = array[i][prop]
        const value = array[i]
        map.set(key, value)
    }

    return map
}

export const objToMap = <V> (obj: { [key: string]: V }): Map<string, V> => {
    const map = new Map<string, V>();

    // 遍历对象中的每个键值对
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            // 使用 set 方法将键和值添加到 Map 中
            map.set(key, value);
        }
    }

    return map;
};