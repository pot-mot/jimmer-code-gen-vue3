<script setup lang="ts">

import GeneratorScriptEditor from "@/modelEditor/generateScript/GeneratorScriptEditor.vue";
import Pane from "@/components/splitpanes/Pane.vue";
import ScriptsMenu from "@/modelEditor/generator/ScriptsMenu.vue";
import DragResizeDialog from "@/components/dialog/DragResizeDialog.vue";
import Splitpanes from "@/components/splitpanes/Splitpanes.vue";
import {ref} from "vue";
import type {ScriptInfo} from "@/modelEditor/generator/ScriptsStore.ts";
import {useModelGenerator} from "@/modelEditor/generator/useModelGenerator.ts";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {useGenerateScriptEditor} from "@/modelEditor/generateScript/useGenerateScriptEditor.ts";
import {translate} from "@/store/i18nStore.ts";

const {
    contextData
} = useModelEditor()

const {
    scriptsStore
} = useModelGenerator()

const {
    openState
} = useGenerateScriptEditor()

const currentScriptInfo = ref<ScriptInfo<any>>()

const handleScriptInfoSelect = (scriptInfo: ScriptInfo<any>) => {
    currentScriptInfo.value = scriptInfo
}

const handleScriptInfoSubmit = (scriptInfo: ScriptInfo<any>) => {
    scriptsStore.value.update(scriptInfo.id, scriptInfo)
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
            {{ translate("script_edit") }}
        </template>
        <Splitpanes>
            <Pane :size="20" class="left-pane">
                <ScriptsMenu
                    :script-operator="scriptsStore"
                    :database-type="contextData.model.databaseType"
                    :jvm-language="contextData.model.jvmLanguage"
                    @select="handleScriptInfoSelect"
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
