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
import TypeMappingDialog from "@/modelEditor/typeMapping/TypeMappingDialog.vue";
import {useTypeMapping} from "@/modelEditor/typeMapping/useTypeMapping.ts";
import DiagnoseDialog from "@/modelEditor/diagnostic/DiagnoseDialog.vue";
import {useDiagnoseDialog} from "@/modelEditor/diagnostic/useDiagnoseDialog.ts";
import GroupEditDialog from "@/modelEditor/group/GroupEditDialog.vue";
import {useGroupEditDialog} from "@/modelEditor/group/useGroupEditDialog.ts";
import PropertyEditDialog from "@/modelEditor/property/PropertyEditDialog.vue";
import {usePropertyEditDialog} from "@/modelEditor/property/usePropertyEditDialog.ts";
import {useGroupCreateDialog} from "@/modelEditor/group/useGroupCreateDialog.ts";
import GroupCreateDialog from "@/modelEditor/group/GroupCreateDialog.vue";
import ModelContextMenu from "@/modelEditor/contextMenu/ModelContextMenu.vue";
import {useModelContextMenu} from "@/modelEditor/contextMenu/useModelContextMenu.ts";
import ModelVersionDialog from "@/modelEditor/versionDiff/VersionDiffDialog.vue";
import {useVersionDiffDialog} from "@/modelEditor/versionDiff/useVersionDiffDialog.ts";

const router = useRouter()
const route = useRoute()

const {
    loadModel,
    contextData,
    loadTables,
} = useModelEditor()

const modelEditDialog = useModelEditDialog()

const fetchModel = async () => {
    await withLoading("load model", async () => {
        const id = route.params.id
        if (id === undefined || typeof id !== "string" || id.length !== 36) {
            sendMessage(translate('not_existed'), {type: "warning"})
            await router.push({name: "ModelList"})
            return
        }

        const model = await api.modelService.get({modelId: id})
        if (model === undefined) {
            sendMessage(translate('not_existed'), {type: "warning"})
            await router.push({name: "ModelList"})
            return
        }

        try {
            const jsonData = JSON.parse(model.jsonData)
            let error
            if (validatePartialModelGraphSubData(jsonData, (e) => error = e)) {
                await loadModel(model, jsonData, model.viewport)
            } else {
                sendMessage(translate('json_validate_error'), {type: "warning"})
                await router.push({name: "ModelList"})
                console.error(error)
                return
            }
        } catch (e) {
            sendMessage(translate({key: 'get_fail', args: [translate('model')]}), {type: "warning"})
            console.error(e)
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
    try {modelEditDialog.close()} catch (e) {console.error(e)}
    try {useModelGenerator().close()} catch (e) {console.error(e)}
    try {useScriptDialog().close()} catch (e) {console.error(e)}
    try {useDatabaseDialog().close()} catch (e) {console.error(e)}
    try {useTypeMapping().close()} catch (e) {console.error(e)}
    try {useDiagnoseDialog().close()} catch (e) {console.error(e)}
    try {useGroupCreateDialog().close()} catch (e) {console.error(e)}
    try {useGroupEditDialog().close()} catch (e) {console.error(e)}
    try {usePropertyEditDialog().close()} catch (e) {console.error(e)}
    try {useModelContextMenu().close()} catch (e) {console.error(e)}
    try {useVersionDiffDialog().close()} catch (e) {console.error(e)}
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
    <TypeMappingDialog/>
    <DiagnoseDialog/>
    <GroupCreateDialog/>
    <GroupEditDialog/>
    <PropertyEditDialog/>
    <ModelContextMenu/>
    <ModelVersionDialog/>
</template>
