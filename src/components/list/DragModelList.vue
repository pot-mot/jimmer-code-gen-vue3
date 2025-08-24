<script setup lang="ts" generic="T">
import {defineEmits, defineProps} from 'vue'
import DragList from './DragList.vue'

const data = defineModel<T[]>({
    required: true
})

const props = defineProps<{
    currentItem: T | undefined,
    toKey: (item: T) => string
}>()

const emit = defineEmits<{
    (e: 'remove', item: T): void
}>()

const handleSwap = (oldIndex: number, newIndex: number) => {
    if (
        oldIndex < 0 || oldIndex > data.value.length ||
        newIndex < 0 || newIndex > data.value.length ||
        newIndex === oldIndex
    ) return
    const tmp = data.value[oldIndex]
    data.value[oldIndex] = data.value[newIndex]
    data.value[newIndex] = tmp
}

const handleDrag = (oldIndex: number, newIndex: number) => {
    if (
        oldIndex < 0 || oldIndex > data.value.length + 1 ||
        newIndex < 0 || newIndex > data.value.length + 1 ||
        newIndex === oldIndex
    ) return
    if (oldIndex < newIndex) {
        const removedItems = data.value.splice(oldIndex, 1)
        data.value.splice(newIndex - 1, 0, ...removedItems)
    } else if (oldIndex > newIndex) {
        const removedItems = data.value.splice(oldIndex, 1)
        data.value.splice(newIndex, 0, ...removedItems)
    }
}

const handleRemove = (item: T) => {
    emit('remove', item)
}
</script>

<template>
    <DragList
        :data="data"
        :current-item="props.currentItem"
        :to-key="toKey"
        @remove="handleRemove"
        @swap="handleSwap"
        @drag="handleDrag"
    >
        <template #default="{ item }">
            <slot :item="item"/>
        </template>
        <template #dragView="{ data }">
            <slot name="dragView" :data="data"/>
        </template>
    </DragList>
</template>
