<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";
import IconEntity from "@/components/icons/modelEditor/IconEntity.vue";
import DiagnoseCount from "@/modelEditor/diagnostic/DiagnoseCount.vue";
import type {DiagnoseMessage} from "@/modelEditor/diagnostic/ModelDiagnoseInfo.ts";

const entity = defineModel<EntityWithProperties>({required: true})

const {
    modelDiagnoseInfo,
    selectedIdSets,
} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.entityIdSet.has(entity.value.id)
})

const allDiagnoseMessages = computed<DiagnoseMessage[]>(() => {
    const messages: DiagnoseMessage[] = []
    const diagnoseInfo = modelDiagnoseInfo.entityMap.get(entity.value.id)
    if (diagnoseInfo !== undefined) {
        messages.push(...diagnoseInfo.entity)
        for (const property of diagnoseInfo.properties.values()) {
            messages.push(...property)
        }
    }
    return messages
})
</script>

<template>
    <div
        class="entity-item"
        :class="{selected: isSelected}"
    >
        <div class="menu-label">
            <IconEntity
                class="menu-icon"
            />
            <NameCommentEditor
                v-model="entity"
                :font-size="14"
            />
        </div>

        <DiagnoseCount
            :messages="allDiagnoseMessages"
        />
    </div>
</template>
