<script setup lang="ts" generic="T">
import {computed, inject, onBeforeMount, onUnmounted} from 'vue'
import type {TreeNode} from "@/components/tree/TreeNode.ts";
import CollapseDetail from "@/components/collapse/CollapseDetail.vue";
import {SelectableTreeInjectKey} from "@/components/tree/SelectableTreeInjectKey.ts";

const props = defineProps<{
    node: TreeNode<T>
    level: number
}>()

const treeSelect = inject(SelectableTreeInjectKey)!

onBeforeMount(() => {
    if (treeSelect.defaultOpen) {
        treeSelect.openedIdSet.value.add(props.node.id)
    }
})

onUnmounted(() => {
    treeSelect.openedIdSet.value.delete(props.node.id)
})

const isOpen = computed({
    get: (): boolean => {
        return treeSelect.openedIdSet.value.has(props.node.id)
    },
    set: (value: boolean) => {
        if (value) {
            treeSelect.openedIdSet.value.add(props.node.id)
        } else {
            treeSelect.openedIdSet.value.delete(props.node.id)
        }
    }
})

const levelPadding = computed(() => {
    return `calc(${props.level} * ${treeSelect.levelPadding})`
})

const hasChildren = computed(() => {
    return props.node.children && props.node.children.length > 0
})

const caretShow = computed(() => {
    return hasChildren.value ? 'visible' : 'hidden'
})

// 计算是否选中
const isSelected = computed(() => {
    return treeSelect.selectedIdSet.value.has(props.node.id)
})

// 计算是否禁用
const isDisabled = computed(() => {
    return treeSelect.isDisabled ?? props.node.disabled ?? false
})

// 点击处理
const handleClick = (event: MouseEvent) => {
    if (isDisabled.value) return
    treeSelect.toggleSelection(props.node.id, event)
}

defineSlots<{
    default(props: { data: T, node: TreeNode<T>, selected: boolean, disabled: boolean }): any
}>()
</script>

<template>
    <div class="tree-select-item" :class="{ selected: isSelected, disabled: isDisabled }">
        <CollapseDetail
            v-model="isOpen"
            trigger-position="left"
        >
            <template #head>
                <div
                    class="tree-node"
                    @click="handleClick"
                >
                    <slot :data="node.data" :node="node" :selected="isSelected" :disabled="isDisabled"/>
                </div>
            </template>
            <template #body v-if="hasChildren">
                <div class="children">
                    <SelectableTreeItem
                        v-for="child in node.children"
                        :key="child.id"
                        :node="child"
                        :level="level + 1"
                    >
                        <template #default="{data, node, selected, disabled}">
                            <slot :data="data" :node="node" :selected="selected" :disabled="disabled"/>
                        </template>
                    </SelectableTreeItem>
                </div>
            </template>
        </CollapseDetail>
    </div>
</template>

<style scoped>
.tree-select-item {
    position: relative;
}

.tree-node {
    display: flex;
}

.tree-select-item > :deep(.collapse-detail-container > .collapse-detail-head) {
    padding-left: v-bind(levelPadding);
}

.tree-select-item > :deep(.collapse-detail-container > .collapse-detail-head:hover) {
    background-color: var(--background-color-hover);
}

.tree-select-item.selected > :deep(.collapse-detail-container > .collapse-detail-head) {
    background-color: var(--primary-color-background);
}

.tree-select-item.disabled > :deep(.collapse-detail-container > .collapse-detail-head) {
    background-color: var(--mask-color);
}

.tree-select-item > :deep(.collapse-detail-container > .collapse-detail-head > .caret-wrapper) {
    visibility: v-bind(caretShow);
}

.children {
    position: relative;
}
</style>
