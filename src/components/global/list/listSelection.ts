import {ref} from "vue";

export const useListSelection = <T>() => {
    const selectedItems = ref(new Set<T>)

    const select = (item: T) => {
        selectedItems.value.add(item)
    }

    const unselect = (item: T) => {
        selectedItems.value.delete(item)
    }

    const cleanSelection = () => {
        selectedItems.value.clear()
    }

    const isSelected = (item: T) => {
        return selectedItems.value.has(item)
    }

    return {
        selectedItems,
        getRawItems: () => [...selectedItems.value.values()],
        select,
        unselect,
        cleanSelection,
        isSelected
    }
}
