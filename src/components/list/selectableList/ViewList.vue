<script setup lang="ts" generic="T">
import type {ListProps} from "@/components/list/selectableList/ListProps.ts";
import type {ListEmits} from "@/components/list/selectableList/ListEmits.ts";
import {createSelectRange, useListSelection} from "@/components/list/selectableList/listSelection.ts";
import {judgeTargetIsInteraction} from "@/utils/event/judgeEventTarget.ts";
import {useClickOutside} from "@/components/list/selectableList/useClickOutside.ts";
import {useTemplateRef} from "vue";
import "./list.css"
import {cloneDeepReadonlyRaw} from "@/utils/type/cloneDeepReadonly.ts";

const props = withDefaults(
    defineProps<ListProps<T>>(),
    {
        beforeCopy: () => {
        },
    }
)

const emits = defineEmits<ListEmits<T>>()

const listSelection = useListSelection<number>()

const {
    lastSelect,
    selectedItemSet,
    isSelected,
    select,
    unselect,
    cleanSelection,
    resetSelection,
} = listSelection

const handleItemClick = (e: MouseEvent, item: DeepReadonly<T>, index: number) => {
    emits('clickItem', item, index)

    e.stopPropagation()
    e.stopImmediatePropagation()

    if (e.ctrlKey) {
        if (!isSelected(index)) {
            select(index)
        } else {
            unselect(index)
        }
    } else if (e.shiftKey) {
        e.preventDefault()
        if (lastSelect.value == undefined) {
            select(index)
            return
        }
        resetSelection(createSelectRange(index, lastSelect.value))
    } else {
        if (!judgeTargetIsInteraction(e)) {
            resetSelection([index])
            lastSelect.value = index
        }
    }
}

const viewListBody = useTemplateRef("viewListBody")

useClickOutside(() => viewListBody.value, () => {
    cleanSelection()
})

const handleKeyboardEvent = async (e: KeyboardEvent) => {
    if (judgeTargetIsInteraction(e)) {
        return
    }

    const selectedItems: DeepReadonly<T>[] = []

    for (const [index, item] of props.lines.entries()) {
        if (selectedItemSet.value.has(index)) {
            selectedItems.push(item)
        }
    }

    if (e.ctrlKey || e.metaKey) {
        if (e.key === 'a') {
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            resetSelection(Array.from(props.lines.keys()))
        } else if (e.key === 'c') {
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()

            const copyData = cloneDeepReadonlyRaw<T[]>(selectedItems)
            props.beforeCopy(copyData)
            await navigator.clipboard.writeText(JSON.stringify(copyData))
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()

        if (e.shiftKey) {
            if (selectedItemSet.value.size > 0 && lastSelect.value !== undefined) {
                const minIndex = Math.min(...selectedItemSet.value)
                const maxIndex = Math.max(...selectedItemSet.value)
                if (minIndex === lastSelect.value) {
                    if (maxIndex - 1 >= 0)
                        resetSelection(createSelectRange(minIndex, maxIndex - 1))
                } else if (maxIndex === lastSelect.value) {
                    if (minIndex - 1 >= 0)
                        resetSelection(createSelectRange(minIndex - 1, maxIndex))
                }
            }
        } else if (lastSelect.value !== undefined && lastSelect.value - 1 >= 0) {
            resetSelection([--lastSelect.value])
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()

        if (e.shiftKey) {
            if (selectedItemSet.value.size > 0 && lastSelect.value !== undefined) {
                const minIndex = Math.min(...selectedItemSet.value)
                const maxIndex = Math.max(...selectedItemSet.value)
                if (minIndex === lastSelect.value) {
                    if (maxIndex + 1 < props.lines.length)
                        resetSelection(createSelectRange(minIndex, maxIndex + 1))
                } else if (maxIndex === lastSelect.value) {
                    if (minIndex + 1 < props.lines.length)
                        resetSelection(createSelectRange(minIndex + 1, maxIndex))
                }
            }
        } else if (lastSelect.value !== undefined && lastSelect.value + 1 < props.lines.length) {
            resetSelection([++lastSelect.value])
        }
    }
}

defineExpose({
    selection: listSelection
})
</script>

<template>
    <div class="view-list" tabindex="-1" @keydown="handleKeyboardEvent">
        <div class="view-list-body" ref="viewListBody">
            <div
                v-for="(item, index) in lines"
                @click="(e) => handleItemClick(e, item, index)"
                class="line-container"
                :class="isSelected(index) ? 'selected' : ''"
            >
                <slot name="line" :item="item" :index="index"/>
            </div>

            <slot name="tail" :lines="lines"/>
        </div>
    </div>
</template>
