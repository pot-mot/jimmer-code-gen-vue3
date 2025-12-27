<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";
import IconEnumeration from "@/components/icons/modelEditor/IconEnumeration.vue";
import type {DiagnoseMessage} from "@/modelEditor/diagnostic/ModelDiagnoseInfo.ts";
import DiagnoseCount from "@/modelEditor/diagnostic/DiagnoseCount.vue";

const enumeration = defineModel<Enumeration>({required: true})

const {
    modelDiagnoseInfo,
    selectedIdSets,
} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.enumerationIdSet.has(enumeration.value.id)
})

const allDiagnoseMessages = computed(() => {
    const messages: DiagnoseMessage[] = []
    const diagnoseInfo = modelDiagnoseInfo.enumerationMap.get(enumeration.value.id)
    if (diagnoseInfo !== undefined) {
        messages.push(...diagnoseInfo.enumeration)
        for (const item of diagnoseInfo.items.values()) {
            messages.push(...item)
        }
    }
    return messages
})
</script>

<template>
    <div
        class="enumeration-item"
        :class="{selected: isSelected}"
    >
        <div class="menu-label">
            <IconEnumeration
                class="menu-icon"
            />
            <NameCommentEditor
                v-model="enumeration"
                :font-size="14"
            />
        </div>

        <DiagnoseCount
            :messages="allDiagnoseMessages"
        />
    </div>
</template>
