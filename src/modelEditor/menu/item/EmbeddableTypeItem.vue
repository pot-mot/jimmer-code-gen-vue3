<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";
import DiagnoseViewer from "@/modelEditor/diagnostic/DiagnoseViewer.vue";
import IconEmbeddableType from "@/components/icons/modelEditor/IconEmbeddableType.vue";

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

        <DiagnoseViewer
            :messages="modelDiagnoseInfo.enumerationMap.get(embeddableType.id)?.enumeration"
        />
    </div>
</template>
