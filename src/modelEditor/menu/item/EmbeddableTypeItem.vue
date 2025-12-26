<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";
import IconEmbeddableType from "@/components/icons/modelEditor/IconEmbeddableType.vue";
import type {DiagnoseMessage} from "@/modelEditor/diagnostic/ModelDiagnoseInfo.ts";
import DiagnoseCount from "@/modelEditor/diagnostic/DiagnoseCount.vue";

const embeddableType = defineModel<EmbeddableTypeWithProperties>({
    required: true
})

const {
    modelDiagnoseInfo,
    selectedIdSets,
} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.embeddableTypeIdSet.has(embeddableType.value.id)
})

const allDiagnoseMessages = computed(() => {
    const messages: DiagnoseMessage[] = []
    const diagnoseInfo = modelDiagnoseInfo.embeddableTypeMap.get(embeddableType.value.id)
    if (diagnoseInfo !== undefined) {
        messages.push(...diagnoseInfo.embeddableType)
        for (const property of Object.values(diagnoseInfo.properties)) {
            messages.push(...property)
        }
    }
    return messages
})
</script>

<template>
    <div
        class="embeddable-type-item"
        :class="{selected: isSelected}"
    >
        <div class="menu-label">
            <IconEmbeddableType
                class="menu-icon"
            />
            <NameCommentEditor
                v-model="embeddableType"
                :font-size="14"
            />
        </div>

        <DiagnoseCount
            :messages="allDiagnoseMessages"
        />
    </div>
</template>
