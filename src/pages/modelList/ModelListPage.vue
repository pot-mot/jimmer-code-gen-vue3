<script setup lang="ts">
import {api} from "@/api";
import DragResizeDialog from "@/components/dialog/DragResizeDialog.vue";
import {onBeforeMount, ref} from "vue";
import type {ModelInsertInput, ModelNoJsonView, ModelUpdateInput} from "@/api/__generated/model/static";
import {withLoading} from "@/components/loading/loadingApi.ts";
import IconAdd from "@/components/icons/IconAdd.vue";
import ModelEditForm from "@/pages/modelList/ModelEditForm.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import {formatDateTime} from "@/utils/datetime/timeFormat.ts";
import {useRouter} from "vue-router";

const modelList = ref<ModelNoJsonView[]>([])

const loadModelList = async () => {
    await withLoading("list model", async () => {
        modelList.value = await api.modelService.list({body: {}})
    })
}

onBeforeMount(async () => {
    await loadModelList()
})

const router = useRouter()

const toModelEditor = (modelId: string) => {
    router.push({name: 'ModelEditor', params: {id: modelId}})
}

const defaultModelInsertInput = (): ModelInsertInput => ({
    name: "",
    description: "",
    databaseType: "POSTGRESQL",
    databaseNameStrategy: "LOWER_SNAKE",
    defaultForeignKeyType: "REAL",
    jvmLanguage: "KOTLIN",
    defaultEnumerationStrategy: "NAME",
    jsonData: "{}"
})

const modelInsertVisible = ref(false)
const modelInsertInput = ref<ModelInsertInput>()

const startModelInsert = () => {
    modelInsertInput.value = defaultModelInsertInput()
    modelInsertVisible.value = true
}

const stopModelInsert = () => {
    modelInsertVisible.value = false
}

const submitModelInsert = async () => {
    await withLoading("insert model", async () => {
        if (modelInsertInput.value !== undefined) {
            const result = await api.modelService.insert({body: modelInsertInput.value})
            modelList.value.push(result)
            modelInsertVisible.value = false
        }
    })
}

const modelUpdateVisible = ref(false)
const modelUpdateInput = ref<ModelUpdateInput>()

const startModelUpdate = async (modelId: string) => {
    await withLoading("get model", async () => {
        modelUpdateInput.value = await api.modelService.get({modelId})
        modelUpdateVisible.value = true
    })
}

const stopModelUpdate = () => {
    modelUpdateVisible.value = false
}

const submitModelUpdate = async () => {
    await withLoading("update model", async () => {
        if (modelUpdateInput.value !== undefined) {
            await api.modelService.update({body: modelUpdateInput.value})
            modelUpdateVisible.value = false
            // 更新列表中的模型数据
            await loadModelList()
        }
    })
}

const deleteModel = async (modelId: string) => {
    await withLoading("delete model", async () => {
        await api.modelService.delete({modelId})
        modelList.value = modelList.value.filter(model => model.id !== modelId)
    })
}
</script>

<template>
    <div class="page">
        <div class="header">
            <h2>模型列表</h2>
            <button @click="startModelInsert" class="add-button">
                <IconAdd/>
                添加模型
            </button>
        </div>

        <div class="model-list">
            <div
                v-for="model in modelList"
                :key="model.id"
                class="model-item"
            >
                <div
                    class="model-info"
                    @click="toModelEditor(model.id)"
                >
                    <h3>{{ model.name }}</h3>
                    <div class="timestamps">创建时间: {{ formatDateTime(model.createdTime) }}</div>
                    <div class="timestamps">修改时间: {{ formatDateTime(model.modifiedTime) }}</div>
                    <div class="description">{{ model.description }}</div>
                </div>

                <div class="actions">
                    <button
                        @click="startModelUpdate(model.id)"
                        class="edit-button"
                    >
                        <IconEdit/>
                        编辑
                    </button>
                    <button
                        @click="deleteModel(model.id)"
                        class="delete-button"
                    >
                        <IconDelete/>
                        删除
                    </button>
                </div>
            </div>
        </div>
    </div>

    <DragResizeDialog
        :model-value="modelInsertVisible && !!modelInsertInput"
        @close="stopModelInsert"
        modal
        can-resize
    >
        <div class="dialog-header">
            <h3>添加模型</h3>
        </div>
        <ModelEditForm
            v-if="modelInsertInput"
            v-model="modelInsertInput"
            @submit="submitModelInsert"
            @cancel="stopModelInsert"
        />
    </DragResizeDialog>

    <DragResizeDialog
        :model-value="modelUpdateVisible && !!modelUpdateInput"
        @close="stopModelUpdate"
        modal
        can-resize
    >
        <div class="dialog-header">
            <h3>编辑模型</h3>
        </div>
        <ModelEditForm
            v-if="modelUpdateInput"
            v-model="modelUpdateInput"
            @submit="submitModelUpdate"
            @cancel="stopModelUpdate"
        />
    </DragResizeDialog>
</template>

<style scoped>
.page {
    height: 100%;
    width: 100%;
    padding: 2rem;
    overflow-y: auto;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.add-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: none;
    padding: 0.5rem;
    border: var(--border);
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 14px;
}

.model-list {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.model-item {
    border: var(--border);
    border-radius: var(--border-radius);
}

.model-info {
    margin: 0.5rem;
}

.description {
    overflow: auto;
}

.timestamps {
    font-size: 0.75rem;
}

.actions {
    display: flex;
    gap: 10px;
}

.edit-button, .delete-button {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

.dialog-header {
    padding: 16px 24px;
}

.dialog-header h3 {
    margin: 0;
    font-size: 18px;
}
</style>
