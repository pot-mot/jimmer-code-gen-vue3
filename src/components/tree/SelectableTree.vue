<script setup lang="ts" generic="T">
import {ref, computed, provide, watch} from 'vue'
import SelectableTreeItem from './SelectableTreeItem.vue'
import type {TreeNode} from "@/components/tree/TreeNode.ts";
import {SelectableTreeInjectKey} from "@/components/tree/SelectableTreeInjectKey.ts";

const props = withDefaults(defineProps<{
    multiple?: boolean
    disabled?: boolean
    levelPadding?: string
    data: TreeNode<T>[]
}>(), {
    multiple: true,
    disabled: false,
    levelPadding: '0.5em',
})

const emits = defineEmits<{
    (e: 'select', nodes: { selected?: TreeNode<T>[], unselected?: TreeNode<T>[] }): void
}>()

// 存储选中项
const selectedIdSet = ref(new Set<string>())
const selectedIds = computed(() => Array.from(selectedIdSet.value))

// 上次选中的节点（用于shift多选）
const lastSelectedId = ref<string>()
watch(() => selectedIdSet.value.size, (value) => {
    if (value === 0) {
        lastSelectedId.value = undefined
    }
})

// 计算所有节点的扁平化列表（用于shift选择）
const flatNodes = computed(() => {
    const result: TreeNode<T>[] = []

    const traverse = (nodes: TreeNode<T>[]) => {
        for (const node of nodes) {
            result.push(node)
            if (node.children && node.children.length > 0) {
                traverse(node.children)
            }
        }
    }

    traverse(props.data)
    return result
})

// 计算所有节点ID的顺序列表
const nodeIdsInOrder = computed(() => {
    return flatNodes.value.map(node => node.id)
})

const getNodeById = (id: string) => {
    const node = flatNodes.value.find(node => node.id === id)
    if (!node) throw new Error(`Node with id ${id} not found`)
    return node
}

// 切换选中状态
const toggleSelection = (id: string, event: MouseEvent) => {
    if (props.disabled) return

    const ctrlKey = event.ctrlKey ?? event.metaKey
    const shiftKey = event.shiftKey

    // 如果是单选模式，直接选中
    if (!props.multiple) {
        if (selectedIdSet.value.size === 1 && selectedIdSet.value.has(id)) {
            lastSelectedId.value = id
            return
        }

        const unselectedNodes = selectedIds.value.map(getNodeById)
        selectedIdSet.value.clear()
        selectedIdSet.value.add(id)
        lastSelectedId.value = id
        emits('select', {selected: [getNodeById(id)], unselected: unselectedNodes})
        return
    }

    const isSelected = selectedIdSet.value.has(id)

    if (shiftKey && lastSelectedId.value !== null && props.multiple) {
        // Shift多选：选择从上次选中到当前节点之间的所有节点
        handleShiftSelection(id)
    } else if (ctrlKey && props.multiple) {
        // Ctrl多选：切换当前节点选中状态
        if (isSelected) {
            selectedIdSet.value.delete(id)
            emits('select', {unselected: [getNodeById(id)]})
        } else {
            selectedIdSet.value.add(id)
            emits('select', {selected: [getNodeById(id)]})
        }
        lastSelectedId.value = id
    } else {
        // 普通点击：单选或清空其他选项
        if (isSelected && selectedIdSet.value.size === 1) {
            selectedIdSet.value.clear()
            lastSelectedId.value = undefined
            emits('select', {unselected: [getNodeById(id)]})
        } else {
            const unselectedNodes = selectedIds.value.map(getNodeById)
            selectedIdSet.value.clear()
            selectedIdSet.value.add(id)
            lastSelectedId.value = id
            emits('select', {selected: [getNodeById(id)], unselected: unselectedNodes})
        }
    }
}

const handleShiftMouseDown = (event: MouseEvent) => {
    event.preventDefault()
}

// 处理shift选择
const handleShiftSelection = (currentId: string) => {
    if (lastSelectedId.value === undefined) {
        selectedIdSet.value.clear()
        selectedIdSet.value.add(currentId)
        return
    }

    const lastIndex = nodeIdsInOrder.value.indexOf(lastSelectedId.value)
    const currentIndex = nodeIdsInOrder.value.indexOf(currentId)

    if (lastIndex === -1 || currentIndex === -1) {
        // 如果找不到节点，退化为普通选择
        if (!selectedIdSet.value.has(currentId)) {
            selectedIdSet.value.add(currentId)
            emits('select', {selected: [getNodeById(currentId)]})
        }
        return
    }

    // 确定范围
    const start = Math.min(lastIndex, currentIndex)
    const end = Math.max(lastIndex, currentIndex)

    // 获取范围内的所有节点ID
    const rangeIds = nodeIdsInOrder.value.slice(start, end + 1)

    // 合并现有选中项和范围选中项，去重
    const newSelectSet = new Set([...selectedIdSet.value, ...rangeIds])

    selectedIdSet.value = newSelectSet
    emits('select', {selected: selectedIds.value.map(getNodeById), unselected: selectedIds.value.filter(id => !newSelectSet.has(id)).map(getNodeById)})
}

// 提供给子组件的方法
provide(SelectableTreeInjectKey, {
    selectedIdSet,
    toggleSelection,
    isDisabled: props.disabled,
    levelPadding: props.levelPadding,
})

defineSlots<{
    default(props: { data: T, node: TreeNode<T>, selected: boolean, disabled: boolean }): any
}>()

defineExpose({
    selectedIdSet,
})
</script>

<template>
    <div
        class="tree-select"
        :class="{ disabled }"
        @mousedown.shift="handleShiftMouseDown"
    >
        <SelectableTreeItem
            v-for="node in data"
            :key="node.id"
            :node="node"
            :level="0"
        >
            <template #default="{data, node, selected, disabled}">
                <slot :data="data" :node="node" :selected="selected" :disabled="disabled"/>
            </template>
        </SelectableTreeItem>
    </div>
</template>

<style scoped>
.tree-select.disabled {
    cursor: not-allowed;
}
</style>
