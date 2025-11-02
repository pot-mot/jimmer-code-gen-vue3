<script setup lang="ts">
import DragResizeDialog from "@/components/dialog/DragResizeDialog.vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {onBeforeUnmount, onMounted, ref} from "vue";
import type {ModelUpdateInput} from "@/api/__generated/model/static";
import ModelEditForm from "@/modelEditor/modelForm/ModelEditForm.vue";
import {useModelForm} from "@/modelEditor/modelForm/useModelForm.ts";

const {
    contextData,
    viewport,
    getModelGraphData,
} = useModelEditor()

const {
    openState,
    on,
    off,
} = useModelForm()

const model = ref<ModelUpdateInput>()

const setModel = () => {
    model.value = {
        ...contextData.model,
        jsonData: JSON.stringify(getModelGraphData(), null, 4),
        viewport: {...viewport.value}
    }
}

onMounted(() => {
    on('open', setModel)
})

onBeforeUnmount(() => {
    off('open', setModel)
})
</script>

<template>
    <DragResizeDialog
        v-model="openState"
        can-resize
        modal
        init-full-screen
    >
        <ModelEditForm
            v-if="model"
            v-model="model"
        />
    </DragResizeDialog>
</template>
