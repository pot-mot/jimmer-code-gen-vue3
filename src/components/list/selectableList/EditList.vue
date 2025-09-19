<script setup lang="ts" generic="T">
import {nextTick, useTemplateRef} from 'vue'
import {cloneDeep} from 'lodash-es'
import type {EditListProps} from "@/components/list/selectableList/ListProps.ts";
import type {EditListEmits, ListEmits} from "@/components/list/selectableList/ListEmits.ts";
import {createSelectRange, useListSelection} from "@/components/list/selectableList/listSelection.ts";
import {judgeTargetIsInteraction} from "@/utils/event/judgeEventTarget.ts";
import {useClickOutside} from "@/components/list/selectableList/useClickOutside.ts";
import {sendMessage} from "@/components/message/messageApi.ts";
import IconAdd from "@/components/icons/IconAdd.vue";
import type {ErrorObject} from "ajv";
import "./list.css"

const lines = defineModel<T[]>('lines', {
    required: true
})

const getTempLines = () => {
    return cloneDeep(lines.value)
}

const props = withDefaults(
    defineProps<EditListProps<T>>(),
    {
        beforePaste: () => {
        },
    }
)

const emits = defineEmits<EditListEmits<T> & ListEmits<T>>()

const editListBody = useTemplateRef("editListBody")

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

useClickOutside(() => editListBody.value, () => {
    cleanSelection()
})

const handleListClipBoardEvent = async (e: KeyboardEvent) => {
    if (judgeTargetIsInteraction(e)) {
        return
    }

    const {
        selectedItems,
        unselectedItems
    } = lines.value.reduce(
        (result, _, index) => {
            const {selectedItems, unselectedItems} = result
            const item = lines.value[index]

            if (selectedItemSet.value.has(index)) {
                selectedItems.push(item)
            } else {
                unselectedItems.push(item)
            }

            return result
        },
        {selectedItems: <T[]>[], unselectedItems: <T[]>[]}
    )

    if (e.key === 'Delete') {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        cleanSelection()
        emits('delete', selectedItems)
        lines.value = unselectedItems
    }

    if (e.ctrlKey || e.metaKey) {
        if (e.key === 'c') {
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            await navigator.clipboard.writeText(JSON.stringify(selectedItems))
        } else if (e.key === 'x') {
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            await navigator.clipboard.writeText(JSON.stringify(selectedItems))
            cleanSelection()
            emits('delete', selectedItems)
            lines.value = unselectedItems
        } else if (e.key === 'v') {
            if (props.jsonSchemaValidate === undefined) return
            const jsonSchemaValidate = props.jsonSchemaValidate

            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            const text = await navigator.clipboard.readText()
            try {
                const value = JSON.parse(text)
                const tempLines = getTempLines()

                let insertIndex = selectedItemSet.value.size > 0 ? Math.max(...selectedItemSet.value.values()) + 1 : tempLines.length

                let insertLength = 0

                const validateErrorsMap = new Map<number, ErrorObject[] | null | undefined>

                if (
                    Array.isArray(value) &&
                    value.filter((item, index) => {
                        return jsonSchemaValidate(item, (e) => validateErrorsMap.set(index, e))
                    }).length === value.length
                ) {
                    props.beforePaste(value)
                    tempLines.splice(insertIndex, 0, ...value)
                    insertLength = value.length
                } else if (jsonSchemaValidate(value, (e) => validateErrorsMap.set(0, e))) {
                    props.beforePaste([value])
                    tempLines.splice(insertIndex, 0, value)
                    insertLength = 1
                } else {
                    sendMessage("Paste Fail", {type: "error"})
                    return
                }

                lines.value = tempLines

                await nextTick()

                cleanSelection()
                for (let i = insertIndex; i < insertIndex + insertLength; i++) {
                    select(i)
                }
            } catch (e) {
                sendMessage("Paste Fail", {type: "error"})
            }
        }
    }

    if (e.key === 'ArrowUp') {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        let tempLines = getTempLines()
        const newSelectIndexes: Set<number> = new Set

        for (let i = 0; i < tempLines.length; i++) {
            const value = tempLines[i]
            if (selectedItemSet.value.has(i)) {
                if (i === 0 || newSelectIndexes.has(i - 1)) {
                    newSelectIndexes.add(i)
                } else {
                    tempLines[i] = tempLines[i - 1]
                    tempLines[i - 1] = value
                    newSelectIndexes.add(i - 1)
                }
            }
        }

        lines.value = tempLines

        await nextTick()

        resetSelection([...newSelectIndexes])
    }

    if (e.key === 'ArrowDown') {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        let tempLines = getTempLines()
        const newSelectIndexes: Set<number> = new Set

        for (let i = tempLines.length - 1; i >= 0; i--) {
            const value = tempLines[i]
            if (selectedItemSet.value.has(i)) {
                if (i === tempLines.length - 1 || newSelectIndexes.has(i + 1)) {
                    newSelectIndexes.add(i)
                } else {
                    tempLines[i] = tempLines[i + 1]
                    tempLines[i + 1] = value
                    newSelectIndexes.add(i + 1)
                }
            }
        }

        lines.value = tempLines

        await nextTick()

        resetSelection([...newSelectIndexes])
    }
}

const getDefaultLine = async (): Promise<T> => {
    let defaultLine: T

    if (props.defaultLine instanceof Function) {
        const temp = props.defaultLine()
        if (temp instanceof Promise) {
            defaultLine = await temp
        } else {
            defaultLine = temp
        }
    } else {
        defaultLine = <T>props.defaultLine
    }

    return cloneDeep(defaultLine)
}

const handleAddLine = async (index: number = lines.value.length - 1) => {
    const defaultLine = await getDefaultLine()

    const tempLines = getTempLines()
    tempLines.splice(index + 1, 0, defaultLine)
    lines.value = tempLines

    await nextTick()

    const newSelectedIndex: number[] = []
    selectedItemSet.value.forEach(i => {
        if (i > index) {
            newSelectedIndex.push(i + 1)
        } else {
            newSelectedIndex.push(i)
        }
    })
    resetSelection(newSelectedIndex)
}

const handleRemoveLine = async (index: number) => {
    emits('delete', [lines.value[index]])
    lines.value = lines.value.filter((_, i) => i !== index)
    await nextTick()
    const newSelectedIndex: number[] = []
    selectedItemSet.value.forEach(i => {
        if (i > index) {
            newSelectedIndex.push(i - 1)
        } else if (i < index) {
            newSelectedIndex.push(i)
        }
    })
    resetSelection(newSelectedIndex)
}

defineExpose({
    getDefaultLine,
    getTempLines,
    handleAddLine,
    handleRemoveLine
})
</script>

<template>
    <div class="edit-list" tabindex="-1" @keydown="handleListClipBoardEvent">
        <slot
            name="head"
            :lines="lines"
            :getDefaultLine="getDefaultLine"
            :handleAddLine="handleAddLine"
            :handleRemoveLine="handleRemoveLine"
        />

        <div class="edit-list-body" ref="editListBody">
            <div
                v-for="(item, index) in lines"
                @click="(e) => handleItemClick(e, item, index)"
                class="line-container"
                :class="isSelected(index) ? 'selected' : ''"
            >
                <slot name="line" :item="item" :index="index"/>
            </div>
        </div>

        <slot
            name="tail"
            :lines="lines"
            :getDefaultLine="getDefaultLine"
            :handleAddLine="handleAddLine"
            :handleRemoveLine="handleRemoveLine"
        >
            <div style="margin: auto; width: min(40%, 6em);">
                <button style="width: 100%" @click="handleAddLine()">
                    <IconAdd/>
                </button>
            </div>
        </slot>
    </div>
</template>