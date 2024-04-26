import {ref} from "vue";

export const useListSelection = <T>() => {
    const lastSelect = ref<T>()

    const selectedItemSet = ref(new Set<T>)

    const select = (item: T) => {
        selectedItemSet.value.add(item)
        lastSelect.value = item
    }

    const unselect = (item: T) => {
        selectedItemSet.value.delete(item)
        if (item == lastSelect.value) lastSelect.value = undefined
    }

    const cleanSelection = () => {
        selectedItemSet.value.clear()
        lastSelect.value = undefined
    }

    const isSelected = (item: T) => {
        return selectedItemSet.value.has(item)
    }

    const resetSelection = (items: T[]) => {
        selectedItemSet.value.clear()
        items.forEach(it => selectedItemSet.value.add(it))
    }

    return {
        lastSelect,
        selectedItemSet,
        select,
        unselect,
        cleanSelection,
        resetSelection,
        isSelected
    }
}

export const createSelectRange = (from: number, to: number): number[] => {
    if (from > to) {
        [from, to] = [to, from];
    }
    const result: number[] = []
    for (let i = from; i <= to; i++) {
        result.push(i)
    }
    return result
}
