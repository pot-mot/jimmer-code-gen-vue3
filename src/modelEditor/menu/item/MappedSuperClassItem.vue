<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";
import DiagnoseViewer from "@/modelEditor/diagnostic/DiagnoseViewer.vue";
import IconAbstractEntity from "@/components/icons/modelEditor/IconAbstractEntity.vue";

const mappedSuperClass = defineModel<MappedSuperClassWithProperties>({required: true})

const {
    modelDiagnoseInfo,
    selectedIdSets,
} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.mappedSuperClassIdSet.has(mappedSuperClass.value.id)
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

        <DiagnoseViewer
            :messages="modelDiagnoseInfo.mappedSuperClassMap.get(mappedSuperClass.id)?.mappedSuperClass"
        />
    </div>
</template>
