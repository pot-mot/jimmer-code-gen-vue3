<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";
import IconAbstractEntity from "@/components/icons/modelEditor/IconAbstractEntity.vue";
import type {DiagnoseMessage} from "@/modelEditor/diagnostic/ModelDiagnoseInfo.ts";
import DiagnoseCount from "@/modelEditor/diagnostic/DiagnoseCount.vue";

const mappedSuperClass = defineModel<MappedSuperClassWithProperties>({required: true})

const {
    modelDiagnoseInfo,
    selectedIdSets,
} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.mappedSuperClassIdSet.has(mappedSuperClass.value.id)
})

const allDiagnoseMessages = computed(() => {
    const messages: DiagnoseMessage[] = []
    const diagnoseInfo = modelDiagnoseInfo.mappedSuperClassMap.get(mappedSuperClass.value.id)
    if (diagnoseInfo !== undefined) {
        messages.push(...diagnoseInfo.mappedSuperClass)
        for (const property of diagnoseInfo.properties.values()) {
            messages.push(...property)
        }
    }
    return messages
})
</script>

<template>
    <div
        class="mapped-super-class-item"
        :class="{selected: isSelected}"
    >
        <div class="menu-label">
            <IconAbstractEntity
                class="menu-icon"
            />
            <NameCommentEditor
                v-model="mappedSuperClass"
                :font-size="14"
            />
        </div>

        <DiagnoseCount
            :messages="allDiagnoseMessages"
        />
    </div>
</template>
