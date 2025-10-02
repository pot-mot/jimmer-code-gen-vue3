<script setup lang="ts">
import AssociationEdge from "@/modelEditor/edge/AssociationEdge.vue";
import {type EdgeProps} from "@vue-flow/core";
import type {ConcreteAssociationEdge} from "@/modelEditor/edge/ConcreteAssociationEdge.ts";
import {computed} from "vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import AssociationViewer from "@/modelEditor/viewer/AssociationViewer.vue";

const props = defineProps<EdgeProps<ConcreteAssociationEdge["data"]>>()

const {contextData} = useModelEditor()

const sourceEntity = computed(() => {
    return contextData.value?.entityMap.get(props.data.association.sourceEntityId)
})

const sourceProperty = computed(() => {
    return sourceEntity.value?.properties.find(it => it.id === props.data.association.sourcePropertyId)
})

const referencedEntity = computed(() => {
    return contextData.value?.entityMap.get(props.data.association.referencedEntityId)
})
</script>

<template>
    <AssociationEdge
        v-bind.prop="props"
        class="concrete-association-edge"
    >
        <template #label>
            <AssociationViewer :association="data.association"/>
        </template>
    </AssociationEdge>
</template>
