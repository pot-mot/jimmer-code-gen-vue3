<script setup lang="ts" generic="T">
import type {ListProps} from "@/components/list/selectableList/ListProps.ts";
import type {ListEmits} from "@/components/list/selectableList/ListEmits.ts";
import {createSelectRange, useListSelection} from "@/components/list/selectableList/listSelection.ts";
import {judgeTargetIsInteraction} from "@/utils/event/judgeEventTarget.ts";
import {useClickOutside} from "@/components/list/selectableList/useClickOutside.ts";
import {useTemplateRef} from "vue";
import "./list.css"

const props = defineProps<ListProps<T>>()

const emits = defineEmits<ListEmits<T>>()

const {
    lastSelect,
    selectedItemSet,
    isSelected,
    select,
    unselect,
    cleanSelection,
    resetSelection,
} = useListSelection<number>()

const handleItemClick = (e: MouseEvent, item: T, index: number) => {
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

const handleListClipBoardEvent = async (e: KeyboardEvent) => {
    if ((e.target as HTMLElement).tagName !== 'DIV') {
        return
    }

    if (e.ctrlKey || e.metaKey) {
        if (e.key === 'c') {
            e.preventDefault()

            const {
                selectedItems
            } = props.lines.reduce(
                (result, _, index) => {
                    const {selectedItems} = result
                    const item = props.lines[index]

                    if (selectedItemSet.value.has(index)) {
                        selectedItems.push(item)
                    }

                    return result
                },
                {selectedItems: <T[]>[]}
            )

            const data = JSON.stringify(selectedItems)
            await navigator.clipboard.writeText(data)
        }
    }
}
</script>

<template>
    <div class="view-list" tabindex="-1" @keydown="handleListClipBoardEvent">
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
