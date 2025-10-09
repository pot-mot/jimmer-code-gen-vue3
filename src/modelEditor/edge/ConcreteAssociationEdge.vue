<script setup lang="ts">
import AssociationEdge from "@/modelEditor/edge/AssociationEdge.vue";
import {type EdgeProps} from "@vue-flow/core";
import type {ConcreteAssociationEdge} from "@/modelEditor/edge/ConcreteAssociationEdge.ts";
import AssociationViewer from "@/modelEditor/viewer/AssociationViewer.vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";
import EntityIdViewer from "@/modelEditor/viewer/EntityIdViewer.vue";
import {ref} from "vue";

const props = defineProps<EdgeProps<ConcreteAssociationEdge["data"]>>()

const associationEdit = ref(false)
</script>

<template>
    <AssociationEdge
        v-bind.prop="props"
        class="concrete-association-edge"
    >
        <template #label>
            <div style="display: flex; justify-content: center;">
                <AssociationViewer
                    v-if="!associationEdit"
                    :association="data.association"
                    @click="associationEdit = true"
                />
                <NameCommentEditor
                    v-else
                    v-model="data.association"
                    class="with-border-bg"
                    auto-focus
                    @change="associationEdit = false"
                    @blur="associationEdit = false"
                />
            </div>
            <div style="display: flex; justify-content: center; line-height: 2.25rem;">
                <EntityIdViewer :id="data.association.referencedEntityId" hide-comment ctrl-focus/>
                <span>.</span>
                <NameCommentEditor v-model="data.association.mappedProperty"/>
                <span style="padding-right: 0.5rem;">:</span>
                <span v-if="data.association.mappedProperty.typeIsList">List<</span>
                <EntityIdViewer :id="data.association.mappedProperty.referencedEntityId" hide-comment ctrl-focus/>
                <span v-if="data.association.mappedProperty.typeIsList">></span>
            </div>
        </template>
    </AssociationEdge>
</template>

<style scoped>
.with-border-bg :deep(input:focus) {
    border: var(--border);
    border-radius: 0.25rem;
    background-color: var(--background-color);
}
</style>
