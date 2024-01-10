import {ref} from "vue";

export const useListSelection = <T>() => {
    const selectedItemSet = ref(new Set<T>)

    const select = (item: T) => {
        selectedItemSet.value.add(item)
    }

    const unselect = (item: T) => {
        selectedItemSet.value.delete(item)
    }

    const cleanSelection = () => {
        selectedItemSet.value.clear()
    }

    const isSelected = (item: T) => {
        return selectedItemSet.value.has(item)
    }

    const resetSelection = (items: T[]) => {
        selectedItemSet.value.clear()
        items.forEach(it => selectedItemSet.value.add(it))
    }

    return {
        selectedItemSet,
        select,
        unselect,
        cleanSelection,
        resetSelection,
        isSelected
    }
}
