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
    viewport: {
        x: 0,
        y: 0,
        zoom: 1,
    },
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
            const result = await api.modelService.update({body: modelUpdateInput.value})
            const index = modelList.value.findIndex(model => model.id === result.id)
            if (index >= 0) {
                modelList.value[index] = result
            } else {
                modelList.value.push(result)
            }
            modelUpdateVisible.value = false
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
                    <div class="name">{{ model.name }}</div>
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
        :init-w="600"
    >
        <template #title>
            添加模型
        </template>
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
        :init-w="600"
    >
        <template #title>
            编辑模型
        </template>
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
    padding: 0.5rem;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 14px;
}

.model-list {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 768px) {
    .model-list {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 480px) {
    .model-list {
        grid-template-columns: repeat(1, 1fr);
    }
}

.model-item {
    border: var(--border);
    border-color: var(--border-color-light);
    border-radius: var(--border-radius);
    padding: 0.5rem;
}

.model-item:hover {
    border-color: var(--border-color);
}

.model-info {
    margin: 0.5rem;
}

.model-info > .name {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
}

.model-info > .description {
    height: 4rem;
    overflow: auto;
    margin-top: 0.25rem;
}

.model-info > .timestamps {
    font-size: 0.75rem;
}

.actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1rem;
}

.edit-button,
.delete-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.5rem;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 0.8rem;
}

.dialog-header {
    padding: 0.5rem;
    font-size: 1rem;
}
</style>
