<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {Delete, EditPen} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {GenModelInput, GenModelSimpleView} from "@/api/__generated/model/static";
import {useLoading} from "@/utils/useLoading.ts";
import {api} from "@/api";
import {sendMessage} from "@/message/message.ts";
import {datetimeFormat} from "@/utils/dateFormat.ts";
import ModelDialog from "@/components/business/model/dialog/ModelDialog.vue";
import {getDefaultModel} from "@/components/business/model/defaultModel.ts";
import {exportModel, importModel} from "@/components/pages/ModelEditor/file/modelFileOperations.ts";
import ExportIcon from "@/components/global/icons/toolbar/ExportIcon.vue";
import {deleteConfirm} from "@/message/confirm.ts";
import DataSourceMenu from "@/components/business/dataSource/menu/DataSourceMenu.vue";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";

const i18nStore = useI18nStore();

const router = useRouter()

const models = ref<GenModelSimpleView[]>([])

const modelsLoading = useLoading('ModelListPage.modelsLoading')

const getModels = modelsLoading.withLoading('get', async () => {
    models.value = await api.modelService.list()
})

onMounted(() => {
    getModels()
})

const toModelEditor = (id: number) => {
    router.push(`/model/${id}`)
}

const editModel = ref<GenModelInput>()

const updateModelList = async (id: number, toEditor: boolean = false) => {
    const newModel = await api.modelService.get({id})
    if (!newModel) {
        sendMessage('模型重新获取失败', 'error')
        return
    }

    const index = models.value.findIndex(it => it.id === id)

    if (index === -1) {
        models.value.push(newModel)
    } else {
        models.value[index] = newModel
    }

    if (toEditor) {
        toModelEditor(id)
    }
}

const modelUploader = ref()

const emitLoadModelJson = () => {
    if (modelUploader.value) {
        modelUploader.value.click()
    }
}

const handleLoadModelJson = modelsLoading.withLoading('loadModelJson', async (e: Event) => {
    const input = e.target as HTMLInputElement

    const file = input.files?.[0]
    if (file) {
        const modelJson = await file.text()
        const id = await importModel(modelJson)

        if (id !== undefined) {
            sendMessage('模型导入成功', 'success')
            await updateModelList(id, true)
        }
    } else {
        sendMessage('文件不存在', 'error')
    }

    input.value = ''
})


const dataSourceLoadMenuOpenState = ref(false)

const emitLoadDataSource = () => {
    dataSourceLoadMenuOpenState.value = true
}


const handleCreate = () => {
    editModel.value = getDefaultModel()
}

const handleEdit = async (id: number) => {
    editModel.value = await api.modelService.get({id})
}

const handleSubmit = modelsLoading.withLoading('handleSubmit', async (model: GenModelInput) => {
    try {
        const isUpdate = (model.id !== undefined)

        const newId = await api.modelService.save({body: model})

        editModel.value = undefined

        await updateModelList(newId, !isUpdate)

        sendMessage(isUpdate ? '模型修改成功' : '模型保存成功', 'success')
    } catch (e) {
        sendMessage(`模型修改失败，原因：${e}`, 'error', e)
    }
})

const handleExport = modelsLoading.withLoading('handleExport', async (model: GenModelSimpleView) => {
    const modeView = await api.modelService.get({id: model.id})

    if (modeView) {
        await exportModel(modeView)
    } else {
        sendMessage('模型导出失败', 'error', model)
    }
})

const handleDelete = (model: GenModelSimpleView) => {
    deleteConfirm(
        `【${model.name}】`,
		modelsLoading.withLoading('handleDelete', async () => {
            const count = await api.modelService.delete({ids: [model.id]})
            if (count > 0) {
                sendMessage('删除模型成功', 'success')
                await getModels()
            } else {
                sendMessage('删除模型失败', 'error')
            }
		})
    )
}
</script>

<template>
    <div class="wrapper" v-loading="modelsLoading.isLoading.value">
        <div>
            <el-button size="large" @click="handleCreate">
				{{ i18nStore.translate('LABEL_ModelListPage_createNewModel') }}
            </el-button>

            <el-button size="large" @click="emitLoadDataSource">
				{{ i18nStore.translate('LABEL_ModelListPage_manageDataSource') }}
            </el-button>

            <el-button size="large" @click="emitLoadModelJson">
                {{ i18nStore.translate('LABEL_ModelListPage_loadModelJson') }}
                <input v-show="false" ref="modelUploader" type="file" accept="application/json"
                       @change="handleLoadModelJson"/>
            </el-button>
        </div>

        <div class="container">
            <template v-for="model in models">
                <div class="model-card hover-show" @click="toModelEditor(model.id)">
                    <div class="right-top hover-show-item">
                        <el-button :icon="EditPen" link type="warning"
                                   @click.prevent.stop="handleEdit(model.id)"/>
                        <el-button :icon="Delete" link type="danger"
                                   @click.prevent.stop="handleDelete(model)"/>
                    </div>

                    <div class="right-bottom hover-show-item">
                        <el-tooltip :content="i18nStore.translate('BUTTON_export')">
                            <el-button :icon="ExportIcon" link type="info"
                                       @click.prevent.stop="handleExport(model)"/>
                        </el-tooltip>
                    </div>

                    <div class="title">{{ model.name }}</div>

                    <div style="padding-top: 0.5em;">
                        <el-text type="info">{{ i18nStore.translate('LABEL_CREATE_AT') }} {{ datetimeFormat(model.createdTime) }}</el-text>
                    </div>

                    <div style="padding-bottom: 0.5em;">
                        <el-text type="info">{{ i18nStore.translate('LABEL_MODIFY_AT') }} {{ datetimeFormat(model.modifiedTime) }}</el-text>
                    </div>

                    <div style="line-height: 1.4em;">
                        <el-text size="default">{{ model.remark }}</el-text>
                    </div>
                </div>
            </template>
        </div>

        <ModelDialog :model-value="!!editModel"
                     :model="editModel"
                     @cancel="editModel = undefined"
                     @submit="handleSubmit"/>

        <DragDialog v-model="dataSourceLoadMenuOpenState"
                    :modal="false"
                    :init-x="100" :init-y="10"
                    :init-w="500" :init-h="600"
                    can-resize>
            <DataSourceMenu ref="dataSourceLoadMenu"/>
        </DragDialog>
    </div>
</template>

<style scoped>
.wrapper {
    height: 100%;
    padding-left: 1em;
    padding-right: 1em;
    padding-top: 0.2em;
}

.container {
    display: grid;
    grid-gap: 1em;
    overflow-y: auto;
    max-height: calc(100% - 3em);
    padding: 1em;
}

@media screen and (max-width: 540px) {
    .container {
        grid-template-columns: 1fr;
    }
}

@media screen and (min-width: 540px) {
    .container {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media screen and (min-width: 900px) {
    .container {
        grid-template-columns: repeat(5, 1fr);
    }
}

.model-card {
    position: relative;
    height: 10em;
    overflow-y: auto;
    padding: 1em;
    box-shadow: var(--el-box-shadow);
    cursor: default;
}

.model-card .title {
    font-family: var(--el-font-family) serif;
    font-size: var(--el-font-size-large);
    color: var(--el-color-info-dark-2);
}

.model-card:hover {
    box-shadow: var(--el-box-shadow-dark);
}

.model-card:hover .title {
    color: var(--el-text-color-primary);
}

.model-card .right-top {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
}

.model-card .right-bottom {
    position: absolute;
    bottom: 0.5em;
    right: 0.5em;
}
</style>
