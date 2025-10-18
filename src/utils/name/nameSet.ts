export type NameSet = {
    countMap: DeepReadonly<Map<string, number>>
    has(name: string): boolean
    add(name: string): void
    remove(name: string): void
    count(name: string): number
    next(name: string): string
    nextThenAdd(name: string): string
}

export const buildNameSet = (
    names: DeepReadonly<Iterable<string | null | undefined>>,
    nextNameTemplate: (name: string, index: number) => string =
        (name, index) => `${name}_${index}`
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
        has(name: string) {
            return countMap.has(name)
        },
        add,
        remove(name: string) {
            if (countMap.has(name)) {
                const count = countMap.get(name)
                if (count !== undefined) {
                    if (count <= 1) {
                        countMap.delete(name)
                    } else {
                        countMap.set(name, count - 1)
                    }
                }
            }
        },
        count(name: string) {
            return countMap.get(name) ?? 0
        },
        next(name: string): string {
            const count = countMap.get(name)
            if (count === undefined) {
                return name
            } else {
                let index = 1
                let currentName = nextNameTemplate(name, index)
                while (countMap.has(currentName)) {
                    currentName = nextNameTemplate(name, ++index)
                }
                return currentName
            }
        },
        nextThenAdd(name: string): string {
            const nextName = this.next(name)
            add(nextName)
            return nextName
        }
    }
}
