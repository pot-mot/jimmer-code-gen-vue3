<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import EmbeddableTypeViewer from "@/modelEditor/viewer/EmbeddableTypeViewer.vue";
import {computed} from "vue";

const props = defineProps<{
    embeddableType: EmbeddableTypeWithProperties
}>()

const {selectedIdSets, selectEmbeddableType, unselectEmbeddableType} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.embeddableTypeIdSet.has(props.embeddableType.id)
})

const handleClick = (event: MouseEvent) => {
    const id = props.embeddableType.id
    if (event.ctrlKey) {
        selectEmbeddableType(id)
    } else {
        if (isSelected.value) {
            unselectEmbeddableType(id)
        } else {
            selectEmbeddableType(id)
        }
    }
}
</script>

<template>
    <div class="menu-item embeddable-type-item" :class="{selected: isSelected}" @click="handleClick($event)">
        <EmbeddableTypeViewer :embeddable-type="embeddableType"/>
    </div>
</template>
