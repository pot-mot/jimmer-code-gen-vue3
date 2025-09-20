<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import EntityViewer from "@/modelEditor/viewer/EntityViewer.vue";
import {computed} from "vue";
import IconAim from "@/components/icons/IconAim.vue";

const props = defineProps<{
    entity: EntityWithProperties
}>()

const {
    selectedIdSets,
    focusNode,
} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.entityIdSet.has(props.entity.id)
})

const handleFocus = () => {
    focusNode(props.entity.id)
}
</script>

<template>
    <div
        class="menu-item entity-item"
        :class="{selected: isSelected}"
    >
        <EntityViewer :entity="entity"/>
        <button @click.stop="handleFocus">
            <IconAim/>
        </button>
    </div>
</template>
