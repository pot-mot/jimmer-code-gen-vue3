<script setup lang="ts">
import ScriptsMenu from "@/modelEditor/generator/ScriptsMenu.vue";
import GeneratorScriptEditor from "@/modelEditor/generator/GeneratorScriptEditor.vue";
import {useModelGenerator} from "@/modelEditor/generator/useModelGenerator.ts";
import Splitpanes from "@/components/splitpanes/Splitpanes.vue";
import Pane from "@/components/splitpanes/Pane.vue";
import DragResizeDialog from "@/components/dialog/DragResizeDialog.vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {ref} from "vue";
import type {ScriptInfo} from "@/modelEditor/generator/ScriptsStore.ts";

const {
    contextData
} = useModelEditor()

const {
    openState,
    scriptsStore,
} = useModelGenerator()

const currentScriptInfo = ref<ScriptInfo<any>>()

const handleScriptInfoSelect = (scriptInfo: ScriptInfo<any>) => {
    currentScriptInfo.value = scriptInfo
}

const handleScriptInfoSubmit = (scriptInfo: ScriptInfo<any>) => {
    scriptsStore.value.update(scriptInfo.key, scriptInfo)
}
</script>

<template>
    <DragResizeDialog
        v-model="openState"
        :init-w="800"
        :init-h="650"
        can-resize
    >
        <div class="wrapper">
            <Splitpanes>
                <Pane :size="20" class="left-pane">
                    <ScriptsMenu
                        :script-operator="scriptsStore"
                        :database-type="contextData.model.databaseType"
                        :jvm-language="contextData.model.jvmLanguage"
                        @select="handleScriptInfoSelect"
                    />
                </Pane>
                <Pane class="result-pane">

                </Pane>
            </Splitpanes>
        </div>

        <DragResizeDialog
            :model-value="!!currentScriptInfo"
            :init-w="800"
            :init-h="650"
            @close="currentScriptInfo = undefined"
            can-resize
        >
            <GeneratorScriptEditor
                v-if="currentScriptInfo"
                :script-info="currentScriptInfo"
                @submit="handleScriptInfoSubmit"
            />
        </DragResizeDialog>
    </DragResizeDialog>
</template>

<style scoped>
.left-pane {
    overflow: auto;
}

.result-pane {
    overflow: auto;
}

.wrapper {
    padding: 0 1rem 1.5rem;
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>
