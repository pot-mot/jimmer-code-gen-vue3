import {ref} from "vue";
import type {UnwrapRefSimple} from "@/components/list/selectableList/declare/UnwrapRefSimple.ts";

export const useListSelection = <T>() => {
    const lastSelect = ref<UnwrapRefSimple<T>>()

    const selectedItemSet = ref(new Set<T>)

    const select = (item: UnwrapRefSimple<T>) => {
        selectedItemSet.value.add(item)
        lastSelect.value = item
    }

    const unselect = (item: UnwrapRefSimple<T>) => {
        selectedItemSet.value.delete(item)
        if (item == lastSelect.value) lastSelect.value = undefined
    }

    const cleanSelection = () => {
        selectedItemSet.value.clear()
        lastSelect.value = undefined
    }

    const isSelected = (item: UnwrapRefSimple<T>): boolean => {
        return selectedItemSet.value.has(item)
    }

    const resetSelection = (items: UnwrapRefSimple<T>[]) => {
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
