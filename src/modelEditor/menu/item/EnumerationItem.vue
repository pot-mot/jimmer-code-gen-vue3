<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import EnumerationViewer from "@/modelEditor/viewer/EnumerationViewer.vue";
import {computed} from "vue";
import IconAim from "@/components/icons/IconAim.vue";

const props = defineProps<{
    enumeration: Enumeration
}>()

const {
    selectedIdSets,
    focusNode,
} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.enumerationIdSet.has(props.enumeration.id)
})

const handleFocus = () => {
    focusNode(props.enumeration.id)
}
</script>

<template>
    <div
        class="enumeration-item"
        :class="{selected: isSelected}"
    >
        <EnumerationViewer :enumeration="enumeration"/>
        <button @click.stop="handleFocus">
            <IconAim/>
        </button>
    </div>
</template>
