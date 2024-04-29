import {DeepReadonly} from "vue";

export const compareArraysIgnoreOrder = <T>(arr1: DeepReadonly<Array<T>>, arr2: DeepReadonly<Array<T>>): boolean => {
    if (arr1.length !== arr2.length) {
        return false
    }

    const elementCount: Map<DeepReadonly<T>, number> = new Map()

    for (const element of arr1) {
        elementCount.set(element, (elementCount.get(element) ?? 0) + 1)
    }

    for (const element of arr2) {
        if (!elementCount.has(element)) {
            return false
        }
        const count = elementCount.get(element)!
        if (count === 1) {
            elementCount.delete(element)
        } else {
            elementCount.set(element, count - 1)
        }
    }

    return elementCount.size === 0
}
