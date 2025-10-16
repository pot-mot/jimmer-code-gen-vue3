<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import IconAim from "@/components/icons/IconAim.vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import DiagnoseViewer from "@/modelEditor/diagnostic/DiagnoseViewer.vue";

const embeddableType = defineModel<EmbeddableTypeWithProperties>({
    required: true
})

const {
    modelDiagnoseInfo,
    selectedIdSets,
    focusNode,
    remove,
} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.embeddableTypeIdSet.has(embeddableType.value.id)
})

const handleFocus = () => {
    focusNode(embeddableType.value.id)
}

const handleRemove = () => {
    remove({embeddableTypeIds: [embeddableType.value.id]})
}
</script>

<template>
    <div
        class="embeddable-type-item"
        :class="{selected: isSelected}"
    >
        <div>
            <NameCommentEditor
                v-model="embeddableType"
                :font-size="14"
            />
            <DiagnoseViewer
                :messages="modelDiagnoseInfo.enumerationMap.get(embeddableType.id)?.enumeration"
            />
        </div>

        <div class="tool">
            <button @click.stop="handleFocus">
                <IconAim/>
            </button>
            <button @click.stop="handleRemove">
                <IconDelete/>
            </button>
        </div>
    </div>
</template>
