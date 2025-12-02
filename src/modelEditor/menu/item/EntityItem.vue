<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";
import DiagnoseViewer from "@/modelEditor/diagnostic/DiagnoseViewer.vue";
import IconEntity from "@/components/icons/modelEditor/IconEntity.vue";

const entity = defineModel<EntityWithProperties>({required: true})

const {
    modelDiagnoseInfo,
    selectedIdSets,
} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.entityIdSet.has(entity.value.id)
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

        <DiagnoseViewer
            :messages="modelDiagnoseInfo.entityMap.get(entity.id)?.entity"
        />
    </div>
</template>
