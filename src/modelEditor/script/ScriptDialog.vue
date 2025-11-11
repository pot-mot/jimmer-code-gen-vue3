<script setup lang="ts">
import GeneratorScriptEditor from "@/modelEditor/script/ScriptEditor.vue";
import Pane from "@/components/splitpanes/Pane.vue";
import ScriptsMenu from "@/modelEditor/script/ScriptsMenu.vue";
import DragResizeDialog from "@/components/dialog/DragResizeDialog.vue";
import Splitpanes from "@/components/splitpanes/Splitpanes.vue";
import {ref} from "vue";
import type {ScriptInfo} from "@/modelEditor/script/ScriptsStore.ts";
import {useScriptDialog} from "@/modelEditor/script/useScriptDialog.ts";
import {translate} from "@/store/i18nStore.ts";
import type {ScriptType} from "@/api/__generated/model/enums";
import {scriptTemplates} from "@/type/__generated/scriptTemplate";

const props = defineProps<{
    model?: Partial<Pick<Model, 'databaseType' | 'jvmLanguage'>>
}>()

const {
    openState,
    scriptsStore,
    insertScript,
    updateScript,
    deleteScript,
} = useScriptDialog()

let currentScriptId: string | undefined
const currentScriptInfo = ref<Omit<ScriptInfo<any>, 'id'>>()

const handleScriptInfoSelect = (scriptInfo: ScriptInfo<any>) => {
    currentScriptId = scriptInfo.id
    currentScriptInfo.value = scriptInfo
}

const startScriptInfoInsert = async (type: ScriptType) => {
    currentScriptId = undefined
    const template = scriptTemplates[type]
    currentScriptInfo.value = {
        name: "[New Script]",
        type,
        enabled: true,
        databaseType: props.model?.databaseType ?? "ANY",
        jvmLanguage: props.model?.jvmLanguage ?? "ANY",
        script: {
            code: template,
            execute: () => {}
        },
    }
}

const handleScriptInfoSubmit = async (scriptInfo: Omit<ScriptInfo<any>, 'id'>) => {
    if (currentScriptId === undefined) {
        await insertScript(scriptInfo)
    } else {
        await updateScript({id: currentScriptId, ...scriptInfo})
    }
}

const handleScriptInfoCancel = () => {
    currentScriptInfo.value = undefined
}
</script>

<template>
    <DragResizeDialog
        v-model="openState"
        @close="currentScriptInfo = undefined"
        can-resize
        modal
    >
        <template #title>
            {{ translate("script_dialog_title") }}
        </template>
        <Splitpanes>
            <Pane :size="20">
                <ScriptsMenu
                    :script-store="scriptsStore"
                    :database-type="model?.databaseType"
                    :jvm-language="model?.jvmLanguage"
                    @select="handleScriptInfoSelect"
                    @start-add="startScriptInfoInsert"
                    @remove="deleteScript"
                />
            </Pane>
            <Pane>
                <GeneratorScriptEditor
                    v-if="currentScriptInfo"
                    :script-info="currentScriptInfo"
                    @submit="handleScriptInfoSubmit"
                    @cancel="handleScriptInfoCancel"
                />
            </Pane>
        </Splitpanes>
    </DragResizeDialog>
</template>
