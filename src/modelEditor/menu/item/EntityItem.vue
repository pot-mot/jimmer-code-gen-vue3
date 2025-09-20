<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import EntityViewer from "@/modelEditor/viewer/EntityViewer.vue";
import {computed} from "vue";

const props = defineProps<{
    entity: EntityWithProperties
}>()

const {selectedIdSets} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.entityIdSet.has(props.entity.id)
})
</script>

<template>
    <div class="menu-item entity-item" :class="{selected: isSelected}">
        <EntityViewer :entity="entity"/>
    </div>
</template>
