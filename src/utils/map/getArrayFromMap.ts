export const getArrayFromMap = <K, T>(map: ReadonlyMap<K, T>, keys: ReadonlyArray<K>) => {
    const result: T[] = []

    for (const key of keys) {
        const value = map.get(key)
        if (value !== undefined) {
            result.push(value)
        }
    }

    return result
}
