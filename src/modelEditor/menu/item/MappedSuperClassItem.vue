<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import IconAim from "@/components/icons/IconAim.vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import DiagnoseViewer from "@/modelEditor/diagnostic/DiagnoseViewer.vue";
import IconAbstractEntity from "@/components/icons/modelEditor/IconAbstractEntity.vue";
import IconEmbeddableType from "@/components/icons/modelEditor/IconEmbeddableType.vue";

const mappedSuperClass = defineModel<MappedSuperClassWithProperties>({required: true})

const {
    modelDiagnoseInfo,
    selectedIdSets,
    focusNode,
    remove,
} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.mappedSuperClassIdSet.has(mappedSuperClass.value.id)
})

const handleFocus = () => {
    focusNode(mappedSuperClass.value.id)
}

const handleRemove = () => {
    remove({mappedSuperClassIds: [mappedSuperClass.value.id]})
}
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
            :messages="modelDiagnoseInfo.mappedSuperClassMap.get(mappedSuperClass.id)?.mappedSuperClass"
        />
    </div>
</template>
