<script setup lang="ts">
import Splitpanes from "@/components/splitpanes/Splitpanes.vue";
import Pane from "@/components/splitpanes/Pane.vue";
import ModelEditorMenu from "@/modelEditor/menu/ModelEditorMenu.vue";
import ModelEditor from "@/modelEditor/ModelEditor.vue";
import {useRoute, useRouter} from "vue-router";
import {onBeforeUnmount, onMounted, watch} from "vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {withLoading} from "@/components/loading/loadingApi.ts";
import {api} from "@/api";
import {sendMessage} from "@/components/message/messageApi.ts";
import {validatePartialModelGraphSubData} from "@/type/context/jsonSchema/PartialModelGraphSubData.ts";
import ModelGenerator from "@/modelEditor/generator/ModelGenerator.vue";
import ModelEditFormDialog from "@/modelEditor/modelForm/ModelEditFormDialog.vue";
import ScriptDialog from "@/modelEditor/script/ScriptDialog.vue";
import {useModelEditDialog} from "@/modelEditor/modelForm/useModelEditDialog.ts";
import {useModelGenerator} from "@/modelEditor/generator/useModelGenerator.ts";
import {useScriptDialog} from "@/modelEditor/script/useScriptDialog.ts";
import {useDatabaseDialog} from "@/modelEditor/database/useDatabaseDialog.ts";
import DatabaseDialog from "@/modelEditor/database/DatabaseDialog.vue";
import {translate} from "@/store/i18nStore.ts";
import type {TableView} from "@/api/__generated/model/static";

const router = useRouter()
const route = useRoute()

const {
    loadModel,
    contextData,
    loadTables,
} = useModelEditor()

const fetchModel = async () => {
    await withLoading("load model", async () => {
        const id = route.params.id
        if (id === undefined || typeof id !== "string" || id.length !== 36) {
            sendMessage("模型ID不合法", {type: "warning"})
            await router.push({name: "ModelList"})
            return
        }

        const model = await api.modelService.get({modelId: id})
        if (model === undefined) {
            sendMessage("模型不存在", {type: "warning"})
            await router.push({name: "ModelList"})
            return
        }

        try {
            const jsonData = JSON.parse(model.jsonData)
            let error
            if (validatePartialModelGraphSubData(jsonData, (e) => error = e)) {
                await loadModel(model, jsonData, model.viewport)
            } else {
                sendMessage(`模型数据类型错误: ${JSON.stringify(error)}`, {type: "warning"})
            }
        } catch (e) {
            sendMessage(`模型获取错误: ${e}`, {type: "warning"})
            await router.push({name: "ModelList"})
            return
        }
    })
}

const loadFromDatabase = async (getTables: () => Promise<TableView[]>) => {
    await withLoading("load tables", async () => {
        const tables = await getTables()
        await loadTables(tables)
    })
}

onMounted(() => {
    fetchModel()
})

watch(() => route.params.id, async () => {
    await fetchModel()
})

onBeforeUnmount(() => {
    useModelEditDialog().close()
    useModelGenerator().close()
    useScriptDialog().close()
    useDatabaseDialog().close()
})
</script>

<template>
    <Splitpanes>
        <Pane :size="20">
            <ModelEditorMenu/>
        </Pane>
        <Pane>
            <ModelEditor/>
        </Pane>
    </Splitpanes>

    <ModelEditFormDialog/>
    <ModelGenerator/>
    <ScriptDialog :model="contextData.model"/>
    <DatabaseDialog>
        <template #database-operations="{getTables}">
            <button @click.stop="loadFromDatabase(getTables)">
                {{ translate('load') }}
            </button>
        </template>
    </DatabaseDialog>
</template>
