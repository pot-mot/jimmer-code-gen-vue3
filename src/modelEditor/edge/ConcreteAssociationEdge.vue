<script setup lang="ts">
import AssociationEdge from "@/modelEditor/edge/AssociationEdge.vue";
import {type EdgeProps} from "@vue-flow/core";
import type {ConcreteAssociationEdge} from "@/modelEditor/edge/ConcreteAssociationEdge.ts";
import AssociationViewer from "@/modelEditor/viewer/AssociationViewer.vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";

const props = defineProps<EdgeProps<ConcreteAssociationEdge["data"]>>()
</script>

<template>
    <AssociationEdge
        v-bind.prop="props"
        class="concrete-association-edge"
    >
        <template #label>
            <AssociationViewer :association="data.association"/>
            <NameCommentEditor v-model="data.association.mappedProperty"/>
        </template>
    </AssociationEdge>
</template>
