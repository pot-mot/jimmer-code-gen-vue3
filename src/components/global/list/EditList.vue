<script setup generic="T" lang="ts">
import {nextTick, ref} from 'vue'
import {cloneDeep} from 'lodash'
import {EditListProps} from "@/components/global/list/ListProps.ts";
import Line from "@/components/global/line/Line.vue";
import LineItem from "@/components/global/line/LineItem.vue";
import {Delete, Plus} from "@element-plus/icons-vue";
import {EditListEmits, ListEmits} from "@/components/global/list/ListEmits.ts";
import {useClickOutside} from "@/components/global/list/useClickOutside.ts";
import {sendI18nMessage} from "@/message/message.ts";
import {createSelectRange, useListSelection} from "@/components/global/list/listSelection.ts";
import {judgeTargetIsInteraction} from "@/utils/clickUtils.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import {ValidateError} from "@/shape/shapeValidate.ts";
import {jsonParseThenConvertNullToUndefined} from "@/utils/nullToUndefined.ts";

const i18nStore = useI18nStore()

const lines = defineModel<T[]>('lines', {
    required: true
})

const getTempLines = () => {
    return cloneDeep(lines.value)
}

const props = withDefaults(
    defineProps<EditListProps<T>>(),
    {
        labelLine: true,
        operation: () => {
            return {
                name: 'operation',
                label: 'LABEL_OPERATION',
                span: '4em'
            }
        },
        beforePaste: () => {
        },
    }
)

const emits = defineEmits<EditListEmits<T> & ListEmits<T>>()

const editListBody = ref<HTMLElement>()

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
                const value = jsonParseThenConvertNullToUndefined(text)
                const tempLines = getTempLines()

                let insertIndex = selectedItemSet.value.size > 0 ? Math.max(...selectedItemSet.value.values()) + 1 : selectedItems.length

                let insertLength = 0

                const validateErrorsMap = new Map<number, ValidateError>

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
                    sendI18nMessage({
                        key: 'MESSAGE_clipBoard_cannotDirectLoad_validateError',
                        args: [validateErrorsMap]
                    }, 'error', validateErrorsMap)
                    return
                }

                emits('delete', selectedItems)
                lines.value = tempLines

                await nextTick()

                cleanSelection()
                for (let i = insertIndex; i < insertIndex + insertLength; i++) {
                    select(i)
                }
            } catch (e) {
                sendI18nMessage('MESSAGE_clipBoard_cannotDirectLoad', 'error', e)
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
    props,
    emits,
    getDefaultLine,
    getTempLines,
    handleAddLine,
    handleRemoveLine
})
</script>

<template>
    <div class="edit-list" tabindex="-1" @keydown="handleListClipBoardEvent">
        <div class="edit-list-head">
            <Line v-if="labelLine" :gap="gap" :height="height">
                <LineItem v-for="column in columns" :span="column.span">
                    <slot name="label">
                        <el-text v-if="column.label" style="padding-left: 0.5em;">
                            {{ i18nStore.translate(column.label) }}
                        </el-text>
                    </slot>
                </LineItem>
                <LineItem :span="operation.span">
                    <el-text v-if="operation.label" style="padding-left: 0.5em;">
                        {{ i18nStore.translate(operation.label) }}
                    </el-text>
                </LineItem>
            </Line>
        </div>

        <div class="edit-list-body" ref="editListBody">
            <slot name="headLines" :columns="columns" :lines="lines"></slot>

            <template v-for="(data, index) in lines">
                <slot name="line" :data="data" :columns="columns" :gap="gap" :height="height">
                    <Line
                        :gap="gap" :height="height"
                        @mousedown="(e) => {handleItemClick(e, data, index)}"
                        :class="isSelected(index) ? 'selected' : ''"
                    >
                        <LineItem v-if="!columns || columns.length === 0">
                            <slot
                                name="default"
                                :data="data"
                                :index="index"
                            >
                                <el-input v-model="lines[index]"/>
                            </slot>
                        </LineItem>

                        <LineItem v-for="(column, columnIndex) in columns" :span="column.span">
                            <slot
                                v-if="'name' in column"
                                :name="column.name"
                                :span="column.span"
                                :data="data"
                                :index="index"
                                :columnIndex="columnIndex"
                            >
                                <slot
                                    name="defaultNoPropItem"
                                    :span="column.span"
                                    :data="data"
                                    :index="index"
                                    :columnIndex="columnIndex"
                                />
                            </slot>

                            <slot
                                v-else
                                :name="column.prop"
                                :span="column.span"
                                :prop="column.prop"
                                :propData="column.prop ? data[column.prop] : undefined"
                                :data="data"
                                :index="index"
                                :columnIndex="columnIndex"
                            >
                                <slot
                                    name="defaultPropItem"
                                    :span="column.span"
                                    :prop="column.prop"
                                    :propData="column.prop ? data[column.prop] : undefined"
                                    :data="data"
                                    :index="index"
                                    :columnIndex="columnIndex">
                                    <el-input v-model="data[column.prop]"></el-input>
                                </slot>
                            </slot>
                        </LineItem>

                        <LineItem :span="operation.span">
                            <slot
                                name="operation"
                                :columns="columns"
                                :lines="lines"
                                :data="data"
                                :index="index"
                                :getDefaultLine="getDefaultLine"
                                :handleAddLine="handleAddLine"
                                :handleRemoveLine="handleRemoveLine">

                                <slot
                                    name="beforeOperation"
                                    :columns="columns"
                                    :lines="lines"
                                    :data="data"
                                    :index="index"
                                    :getDefaultLine="getDefaultLine"
                                    :handleAddLine="handleAddLine"
                                    :handleRemoveLine="handleRemoveLine"/>

                                <el-button @click.prevent.stop="handleAddLine(index)"
                                           :icon="Plus" link style="margin-left: 0.3em;"/>
                                <el-button @click.prevent.stop="handleRemoveLine(index)"
                                           :icon="Delete" link style="margin-left: 0.3em;" type="danger"/>

                                <slot
                                    name="afterOperation"
                                    :columns="columns"
                                    :lines="lines"
                                    :data="data"
                                    :index="index"
                                    :getDefaultLine="getDefaultLine"
                                    :handleAddLine="handleAddLine"
                                    :handleRemoveLine="handleRemoveLine"
                                />
                            </slot>
                        </LineItem>
                    </Line>
                </slot>
            </template>

            <slot
                name="tailLines"
                :columns="columns"
                :lines="lines"
                :gap="gap"
                :height="height"
                :getDefaultLine="getDefaultLine"
                :handleAddLine="handleAddLine"
                :handleRemoveLine="handleRemoveLine"
            >
                <div style="margin: auto; width: min(40%, 6em);">
                    <el-button :icon="Plus" style="width: 100%" @click="handleAddLine()"/>
                </div>
            </slot>
        </div>
    </div>
</template>