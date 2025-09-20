<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import MappedSuperClassViewer from "@/modelEditor/viewer/MappedSuperClassViewer.vue";
import {computed} from "vue";
import IconAim from "@/components/icons/IconAim.vue";

const props = defineProps<{
    mappedSuperClass: MappedSuperClassWithProperties
}>()

const {
    selectedIdSets,
    focusNode,
} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.mappedSuperClassIdSet.has(props.mappedSuperClass.id)
})

const handleFocus = () => {
    focusNode(props.mappedSuperClass.id)
}
</script>

<template>
    <div
        class="menu-item mapped-super-class-item"
        :class="{selected: isSelected}"
    >
        <MappedSuperClassViewer :mappedSuperClass="mappedSuperClass"/>
        <button @click.stop="handleFocus">
            <IconAim/>
        </button>
    </div>
</template>
