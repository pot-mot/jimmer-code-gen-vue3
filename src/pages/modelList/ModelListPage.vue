<script setup lang="ts">
import {api} from "@/api";
import DragResizeDialog from "@/components/dialog/DragResizeDialog.vue";
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import type {
    ModelInsertInput,
    ModelNoJsonView,
    ModelSpec,
    ModelUpdateInput
} from "@/api/__generated/model/static";
import {withLoading} from "@/components/loading/loadingApi.ts";
import IconAdd from "@/components/icons/IconAdd.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import {formatDateTime} from "@/utils/datetime/timeFormat.ts";
import {useRouter} from "vue-router";
import ModelConfigForm from "@/modelEditor/modelForm/ModelConfigForm.vue";
import JvmLanguageView from "@/modelEditor/modelForm/jvmLanguage/JvmLanguageView.vue";
import DatabaseTypeView from "@/modelEditor/modelForm/databaseType/DatabaseTypeView.vue";
import {sendConfirm} from "@/components/confirm/confirmApi.ts";
import {translate} from "@/store/i18nStore.ts";
import {useDatabaseDialog} from "@/modelEditor/database/useDatabaseDialog.ts";
import {useTypeMapping} from "@/modelEditor/typeMapping/useTypeMapping.ts";
import DatabaseDialog from "@/modelEditor/database/DatabaseDialog.vue";
import TypeMappingDialog from "@/modelEditor/typeMapping/TypeMappingDialog.vue";
import IconDatabase from "@/components/icons/IconDatabase.vue";
import IconCode from "@/components/icons/IconCode.vue";
import DatabaseTypeNullableSelect from "@/modelEditor/modelForm/databaseType/DatabaseTypeNullableSelect.vue";
import JvmLanguageNullableSelect from "@/modelEditor/modelForm/jvmLanguage/JvmLanguageNullableSelect.vue";
import IconCaretDown from "@/components/icons/IconCaretDown.vue";
import type {ModelOrder} from "@/api/__generated/model/enums";

const modelList = ref<ModelNoJsonView[]>([])
const modelQuerySpec = ref<ModelSpec>({})
const modelOrder = ref<ModelOrder>("MODIFIED_TIME_DESC")

const loadModelList = async () => {
    await withLoading("list model", async () => {
        modelList.value = await api.modelService.list({
            body: modelQuerySpec.value,
            modelOrder: modelOrder.value,
        })
    })
}

onMounted(async () => {
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

const submitModelInsert = async (model: ModelInsertInput) => {
    await withLoading("insert model", async () => {
        const result = await api.modelService.insert({body: model})
        modelInsertVisible.value = false
        toModelEditor(result.id)
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

const submitModelUpdate = async (model: ModelUpdateInput) => {
    await withLoading("update model", async () => {
        await api.modelService.update({body: model})
        await loadModelList()
        modelUpdateVisible.value = false
    })
}

const deleteModel = async (model: Model) => {
    sendConfirm({
        title: translate({key: "delete_confirm_title", args: [translate("model")]}),
        content: translate({key: "delete_confirm_content", args: [` ${translate("model")}[${model.name}] `]}),
        onConfirm: async () => {
            await withLoading("delete model", async () => {
                await api.modelService.delete({modelId: model.id})
                modelList.value = modelList.value.filter(it => model.id !== it.id)
            })
        }
    })
}

const {
    open: openDatabaseDialog,
} = useDatabaseDialog()

const {
    open: openTypeMapping,
} = useTypeMapping()

onBeforeUnmount(() => {
    useDatabaseDialog().close()
    useTypeMapping().close()
})
</script>

<template>
    <div class="page">
        <div class="page-header">
            <div class="header-operations">
                <h2>{{ translate('model_list_title') }}</h2>
                <button @click="startModelInsert" class="header-button">
                    <IconAdd/>
                    {{ translate('model_create_button') }}
                </button>
            </div>

            <div class="header-operations">
                <button @click="openDatabaseDialog" class="header-button">
                    <IconDatabase/>
                    {{ translate('database_dialog_button') }}
                </button>
                <button @click="openTypeMapping" class="header-button">
                    <IconCode/>
                    {{ translate('type_mapping_dialog_button') }}
                </button>
            </div>
        </div>

        <div class="page-query">
            <input
                class="keywords-input"
                v-model="modelQuerySpec.keywords"
                :placeholder="translate({key: 'input_placeholder', args: [translate('keywords')]})"
                @change="loadModelList"
            >
            <JvmLanguageNullableSelect
                class="jvm-language-select"
                v-model="modelQuerySpec.jvmLanguage"
                @update:model-value="loadModelList"
            />
            <DatabaseTypeNullableSelect
                class="database-type-select"
                v-model="modelQuerySpec.databaseType"
                @update:model-value="loadModelList"
            />
            <button @click="() => {
                if (modelOrder !== 'CREATE_TIME_DESC') modelOrder = 'CREATE_TIME_DESC'
                else modelOrder = 'CREATE_TIME_ASC'
                loadModelList()
            }">
                {{ translate('createdTime') }}
                <IconCaretDown :style="{
                    visibility: modelOrder.startsWith('CREATE_TIME') ? 'visible' : 'hidden',
                    rotate: modelOrder === 'CREATE_TIME_ASC' ? '180deg' : '0deg'
                }"/>
            </button>
            <button @click="() => {
                if (modelOrder !== 'MODIFIED_TIME_DESC') modelOrder = 'MODIFIED_TIME_DESC'
                else modelOrder = 'MODIFIED_TIME_ASC'
                loadModelList()
            }">
                {{ translate('modifiedTime') }}
                <IconCaretDown :style="{
                    visibility: modelOrder.startsWith('MODIFIED_TIME') ? 'visible' : 'hidden',
                    rotate: modelOrder === 'MODIFIED_TIME_ASC' ? '180deg' : '0deg'
                }"/>
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
                    <div class="header">
                        <div class="name" @click.stop>
                            {{ model.name }}
                        </div>
                        <div class="tags">
                            <JvmLanguageView :jvm-language="model.jvmLanguage"/>
                            <DatabaseTypeView :database-type="model.databaseType"/>
                        </div>
                    </div>
                    <div class="timestamps">
                        <div>
                            {{ translate('createdTime') }} {{ formatDateTime(model.createdTime) }}
                        </div>
                        <div>
                            {{ translate('modifiedTime') }} {{ formatDateTime(model.modifiedTime) }}
                        </div>
                    </div>
                    <div class="description">
                        {{ model.description }}
                    </div>
                </div>

                <div class="actions">
                    <button
                        @click="startModelUpdate(model.id)"
                        class="edit-button"
                    >
                        <IconEdit/>
                        {{ translate('edit') }}
                    </button>
                    <button
                        @click="deleteModel(model)"
                        class="delete-button"
                    >
                        <IconDelete/>
                        {{ translate('delete') }}
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
        :init-h="340"
    >
        <template #title>
            {{ translate('model_create_title') }}
        </template>
        <ModelConfigForm
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
        :init-h="340"
    >
        <template #title>
            {{ translate('model_update_title') }}
        </template>
        <ModelConfigForm
            v-if="modelUpdateInput"
            v-model="modelUpdateInput"
            @submit="submitModelUpdate"
            @cancel="stopModelUpdate"
        />
    </DragResizeDialog>

    <DatabaseDialog/>
    <TypeMappingDialog/>
</template>

<style scoped>
.page {
    height: 100%;
    width: 100%;
    overflow-y: auto;
}

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1rem 0;
}

.header-operations {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.header-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: var(--border-radius);
    cursor: pointer;
}

.page-query {
    display: flex;
    height: 3rem;
    padding: 1rem 1rem 0;
    gap: 0.5rem;
}

.keywords-input {
    border-radius: 0.5rem;
    padding: 0.5rem;
    height: 2.3rem;
}

.jvm-language-select {
    width: 9rem;
}
.database-type-select {
    width: 12rem;
}

.model-list {
    display: grid;
    padding: 1rem 1rem 0;
    grid-gap: 1rem;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    max-height: calc(100% - 8rem);
    overflow-y: auto;
    scrollbar-gutter: stable;
}

@media (max-width: 768px) {
    .model-list {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 500px) {
    .model-list {
        grid-template-columns: repeat(1, 1fr);
    }
}

.model-item {
    border: var(--border);
    border-color: var(--border-color-light);
    border-radius: var(--border-radius);
    padding: 0.5rem;
    display: grid;
    grid-template-rows: 1fr 2rem;
    min-height: 12rem;
}

.model-item:hover {
    border-color: var(--border-color);
}

.model-info {
    margin: 0.5rem;
    display: grid;
    grid-template-rows: auto auto 1fr;
}

.model-info > .header {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
}

.model-info > .header > .name {
    font-size: 1.2rem;
    font-weight: 600;
    word-break: break-word;
    word-wrap: break-word;
    max-height: 4rem;
    overflow: auto;
}

.model-info > .header  > .tags {
    display: flex;
    gap: 0.5rem;
}

.model-info > .header > .tags > div {
    border: var(--border);
    border-color: var(--background-color-hover);
    border-radius: 0.25rem;
    font-size: 0.75rem;
    line-height: 0.75rem;
    padding: 0.25rem;
    height: 1.5rem;
}

.model-info > .description {
    overflow: auto;
    margin-top: 0.25rem;
    max-height: 5rem;
}

.model-info > .timestamps {
    font-size: 0.75rem;
}

.actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
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
</style>
