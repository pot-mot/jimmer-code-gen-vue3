<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import IconAim from "@/components/icons/IconAim.vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import DiagnoseViewer from "@/modelEditor/diagnostic/DiagnoseViewer.vue";
import IconEnumeration from "@/components/icons/modelEditor/IconEnumeration.vue";
import IconEmbeddableType from "@/components/icons/modelEditor/IconEmbeddableType.vue";

const enumeration = defineModel<Enumeration>({required: true})

const {
    modelDiagnoseInfo,
    selectedIdSets,
    focusNode,
    remove,
} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.enumerationIdSet.has(enumeration.value.id)
})

const handleFocus = () => {
    focusNode(enumeration.value.id)
}

const handleRemove = () => {
    remove({enumerationIds: [enumeration.value.id]})
}
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

            <div class="tool">
                <button @click.stop="handleFocus">
                    <IconAim/>
                </button>
                <button @click.stop="handleRemove">
                    <IconDelete/>
                </button>
            </div>
        </div>

        <DiagnoseViewer
            :messages="modelDiagnoseInfo.enumerationMap.get(enumeration.id)?.enumeration"
        />
    </div>
</template>
