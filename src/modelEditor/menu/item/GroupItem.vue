<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import GroupViewer from "@/modelEditor/viewer/GroupViewer.vue";
import {computed} from "vue";

const props = defineProps<{
    group: Group
}>()

const {selectedIdSets} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.groupIdSet.has(props.group.id)
})
</script>

<template>
    <div class="menu-item group-item" :class="{selected: isSelected}">
        <GroupViewer :group="group"/>
    </div>
</template>
