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

defineProps<{
    model?: Partial<Pick<Model, 'databaseType' | 'jvmLanguage'>>
}>()

const {
    openState,
    scriptsStore,
    insertScript,
    updateScript,
    deleteScript,
} = useScriptDialog()

const currentScriptInfo = ref<ScriptInfo<any>>()

const handleScriptInfoSelect = (scriptInfo: ScriptInfo<any>) => {
    currentScriptInfo.value = scriptInfo
}

const startScriptInfoInsert = (name: string, type: ScriptType) => {

}

const handleScriptInfoSubmit = (scriptInfo: ScriptInfo<any>) => {
    updateScript(scriptInfo)
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
                    @start-add=""
                    @remove="deleteScript"
                />
            </Pane>
            <Pane>
                <GeneratorScriptEditor
                    v-if="currentScriptInfo"
                    :script-info="currentScriptInfo"
                    @submit="handleScriptInfoSubmit"
                />
            </Pane>
        </Splitpanes>
    </DragResizeDialog>
</template>
