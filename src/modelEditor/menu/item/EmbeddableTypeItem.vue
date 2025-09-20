<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import EmbeddableTypeViewer from "@/modelEditor/viewer/EmbeddableTypeViewer.vue";
import {computed} from "vue";
import IconAim from "@/components/icons/IconAim.vue";

const props = defineProps<{
    embeddableType: EmbeddableTypeWithProperties
}>()

const {
    selectedIdSets,
    focusNode,
} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.embeddableTypeIdSet.has(props.embeddableType.id)
})

const handleFocus = () => {
    focusNode(props.embeddableType.id)
}
</script>

<template>
    <div
        class="menu-item embeddable-type-item"
        :class="{selected: isSelected}"
    >
        <EmbeddableTypeViewer :embeddable-type="embeddableType"/>
        <button @click.stop="handleFocus">
            <IconAim/>
        </button>
    </div>
</template>
