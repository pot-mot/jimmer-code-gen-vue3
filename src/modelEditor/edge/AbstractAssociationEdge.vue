<script setup lang="ts">
import {SmoothStepEdge, type EdgeProps} from "@vue-flow/core";
import type {AbstractAssociationEdge} from "@/modelEditor/edge/AbstractAssociationEdge.ts";
import {computed, watch} from "vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";

const props = defineProps<EdgeProps<AbstractAssociationEdge["data"]>>()

const {contextData} = useModelEditor()

const sourceMappedSuperClass = computed(() => {
    return contextData.value?.entityMap.get(props.data.association.sourceAbstractEntityId)
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
