<script setup lang="ts">
import DragResizeDialog from "@/components/dialog/DragResizeDialog.vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {nextTick, ref} from "vue";
import type {ModelUpdateInput} from "@/api/__generated/model/static";
import ModelEditForm from "@/modelEditor/modelForm/ModelEditForm.vue";
import {useModelForm} from "@/modelEditor/modelForm/useModelForm.ts";
import {api} from "@/api";
import {withLoading} from "@/components/loading/loadingApi.ts";
import {jsonPrettyFormat} from "@/utils/json/jsonStringify.ts";

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
let jsonDataCache: string | undefined

const setModel = async () => {
    model.value = {
        ...contextData.model,
        jsonData: jsonPrettyFormat(getModelGraphData()),
        viewport: {...viewport.value}
    }
    await nextTick()
    jsonDataCache = model.value?.jsonData
}

const handleSubmit = async (model: ModelUpdateInput) => {
    await withLoading("update model", async () => {
        const result = await api.modelService.update({body: model})
        close()

        if (model.jsonData !== jsonDataCache) {
            await loadModel(result, JSON.parse(model.jsonData), result.viewport)
        }
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
