<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import EnumerationItemViewer from "@/modelEditor/viewer/property/EnumerationItemViewer.vue";

const {contextData} = useModelEditor()

const props = withDefaults(defineProps<{
    enumerationId: string
    id: string
    ctrlFocus?: boolean
    hideComment?: boolean
}>(), {
    ctrlFocus: false
})

const item = computed(() => {
    return contextData.enumerationMap.get(props.enumerationId)?.items.find(p => p.id === props.id)
})
</script>

<template>
    <EnumerationItemViewer
        :enumeration-id="enumerationId"
        :item="item"
        :hide-comment="hideComment"
        :ctrl-focus="ctrlFocus"
    />
</template>
