export const getArrayFromMap = <K, T>(map: Map<K, T>, keys: K[]) => {
    const result: T[] = []

    for (const key of keys) {
        const value = map.get(key)
        if (value !== undefined) {
            result.push(value)
        }
    }

    return result
}
