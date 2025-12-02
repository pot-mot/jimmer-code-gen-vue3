<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";
import DiagnoseViewer from "@/modelEditor/diagnostic/DiagnoseViewer.vue";
import IconEnumeration from "@/components/icons/modelEditor/IconEnumeration.vue";

const enumeration = defineModel<Enumeration>({required: true})

const {
    modelDiagnoseInfo,
    selectedIdSets,
} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.enumerationIdSet.has(enumeration.value.id)
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

        <DiagnoseViewer
            :messages="modelDiagnoseInfo.enumerationMap.get(enumeration.id)?.enumeration"
        />
    </div>
</template>
