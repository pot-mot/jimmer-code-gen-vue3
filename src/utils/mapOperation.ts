export const arrayToMap = <T> (array: T[], prop: keyof T): Map<any, T> => {
    const map = new Map<any, T>()

    for (let i = 0; i < array.length; i += 2) {
        const key = array[i][prop]
        const value = array[i]
        map.set(key, value)
    }

    return map
}