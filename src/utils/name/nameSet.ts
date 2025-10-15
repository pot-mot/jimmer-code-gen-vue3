export type ReadonlyNameSet = {
    countMap: DeepReadonly<Map<string, number>>
    has(name: string): boolean,
    count(name: string): number,
    next(name: string): string,
}

export type NameSet = ReadonlyNameSet & {
    countMap: DeepReadonly<Map<string, number>>
    has(name: string): boolean,
    add(name: string): void,
    count(name: string): number,
    next(name: string): string,
}

export const buildReadonlyNameSet = (
    names: DeepReadonly<Iterable<string | null | undefined>>
): ReadonlyNameSet => {
    const countMap = new Map<string, number>()
    for (const name of names) {
        if (name !== null && name !== undefined) {
            const count = countMap.get(name) ?? 0
            countMap.set(name, count + 1)
        }
    }
    return {
        countMap,
        has(name: string) {
            return countMap.has(name)
        },
        count(name: string) {
            return countMap.get(name) ?? 0
        },
        next(name: string): string {
            let count = countMap.get(name)
            if (count === undefined) {
                return name
            } else {
                let currentName = `${name}(${count})`
                while (countMap.has(currentName)) {
                    count++
                    currentName = `${name}(${count})`
                }
                return currentName
            }
        },
    }
}

export const buildNameSet = (
    names: DeepReadonly<Iterable<string | null | undefined>>
): NameSet => {
    const countMap = new Map<string, number>()
    const add = (name: string) => {
        const count = countMap.get(name) ?? 0
        countMap.set(name, count + 1)
    }
    for (const name of names) {
        if (name !== null && name !== undefined) {
            add(name)
        }
    }
    return {
        countMap,
        add,
        has(name: string) {
            return countMap.has(name)
        },
        count(name: string) {
            return countMap.get(name) ?? 0
        },
        next(name: string): string {
            let count = countMap.get(name)
            if (count === undefined) {
                return name
            } else {
                let currentName = `${name}(${count})`
                while (countMap.has(currentName)) {
                    count++
                    currentName = `${name}(${count})`
                }
                add(currentName)
                return currentName
            }
        },
    }
}
