<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import IconAim from "@/components/icons/IconAim.vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import DiagnoseViewer from "@/modelEditor/diagnostic/DiagnoseViewer.vue";

const entity = defineModel<EntityWithProperties>({required: true})

const {
    modelDiagnoseInfo,
    selectedIdSets,
    focusNode,
    remove,
} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.entityIdSet.has(entity.value.id)
})

const handleFocus = () => {
    focusNode(entity.value.id)
}

const handleRemove = () => {
    remove({entityIds: [entity.value.id]})
}
</script>

<template>
    <div
        class="entity-item"
        :class="{selected: isSelected}"
    >
        <div>
            <NameCommentEditor
                v-model="entity"
                :font-size="14"
            />
            <DiagnoseViewer
                :messages="modelDiagnoseInfo.entityMap.get(entity.id)?.entity"
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
