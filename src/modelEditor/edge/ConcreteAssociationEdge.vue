<script setup lang="ts">
import {SmoothStepEdge, type EdgeProps} from "@vue-flow/core";
import type {ConcreteAssociationEdge} from "@/modelEditor/edge/ConcreteAssociationEdge.ts";
import {computed} from "vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";

const props = defineProps<EdgeProps<ConcreteAssociationEdge["data"]>>()

const {contextData} = useModelEditor()

const sourceEntity = computed(() => {
    return contextData.value?.entityMap.get(props.data.association.sourceEntityId)
})

const referencedEntity = computed(() => {
    return contextData.value?.entityMap.get(props.data.association.referencedEntityId)
})

</script>

<template>
    <g>
        <SmoothStepEdge
            ref="bezierRef"
            v-bind.prop="props"
            class="content-edge-line"
        />
    </g>
</template>
