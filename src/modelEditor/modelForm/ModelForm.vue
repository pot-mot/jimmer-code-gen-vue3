<script setup lang="ts">
import DragResizeDialog from "@/components/dialog/DragResizeDialog.vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {ref} from "vue";
import type {ModelUpdateInput} from "@/api/__generated/model/static";
import ModelEditForm from "@/modelEditor/modelForm/ModelEditForm.vue";
import {useModelForm} from "@/modelEditor/modelForm/useModelForm.ts";
import {api} from "@/api";
import {withLoading} from "@/components/loading/loadingApi.ts";

const {
    contextData,
    viewport,
    getModelGraphData,
    loadModel,
} = useModelEditor()

const {
    openState,
    close,
} = useModelForm()

const model = ref<ModelUpdateInput>()

const setModel = () => {
    model.value = {
        ...contextData.model,
        jsonData: JSON.stringify(getModelGraphData(), null, 4),
        viewport: {...viewport.value}
    }
}

const handleSubmit = async (model: ModelUpdateInput) => {
    await withLoading("update model", async () => {
        const result = await api.modelService.update({body: model})
        close()

        await loadModel(result, JSON.parse(model.jsonData), result.viewport)
    })
}

const handleCancel = () => {
    close()
}
</script>

<template>
    <DragResizeDialog
        v-model="openState"
        can-resize
        modal
        @opened="setModel"
    >
        <ModelEditForm
            v-if="model"
            v-model="model"
            @submit="handleSubmit"
            @cancel="handleCancel"
        />
    </DragResizeDialog>
</template>
