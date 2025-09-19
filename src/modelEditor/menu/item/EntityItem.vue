<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import EntityViewer from "@/modelEditor/viewer/EntityViewer.vue";
import {computed} from "vue";

const props = defineProps<{
    entity: EntityWithProperties
}>()

const {
    selectedIdSets,
    selectEntity,
    unselectEntity
} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.entityIdSet.has(props.entity.id)
})

const handleClick = (event: MouseEvent) => {
    const id = props.entity.id
    if (event.ctrlKey) {
        selectEntity(id)
    } else {
        if (isSelected.value) {
            unselectEntity(id)
        } else {
            selectEntity(id)
        }
    }
}
</script>

<template>
    <div class="menu-item entity-item" :class="{selected: isSelected}" @click="handleClick($event)">
        <EntityViewer :entity="entity"/>
    </div>
</template>
