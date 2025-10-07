<script setup lang="ts" generic="Name extends ScriptTypeName">
import {createScriptsStore, type ScriptInfo, type ScriptsStore} from "@/modelEditor/generator/ScriptsStore.ts";
import type {ScriptTypeName} from "@/type/__generated/scriptTypeDeclare";
import TsScriptEditor from "@/components/code/scriptEditor/TsScriptEditor.vue";
import {createTsScript, TsScriptExecutor} from "@/components/code/scriptEditor/TsScriptExecutor.ts";
import {computed, ref} from "vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {modelGenerate} from "@/modelEditor/generator/modelGenerate.ts";
import {contextDataToSubIds} from "@/type/context/utils/ModelSubIds.ts";
import {jsonPrettyFormat} from "@/utils/json/jsonStringify.ts";

const {
    contextData,
    getContext
} = useModelEditor()

const props = defineProps<{
    scriptInfo: ScriptInfo<Name>,
}>()

const emits = defineEmits<{
    (e: 'submit', result: ScriptInfo<Name>): void
}>()

const value = ref(props.scriptInfo.script.code)
const generateResult = ref<Record<string, string>>()
const errorMessage = ref("")

const executor = computed(() => new TsScriptExecutor(props.scriptInfo.type))

const receiveError = (error: any) => {
    if (typeof error === 'string') {
        errorMessage.value = error
    } else if (error instanceof Error) {
        errorMessage.value = error.message
    } else if (typeof error === 'object') {
        errorMessage.value = jsonPrettyFormat(error)
    } else {
        errorMessage.value = String(error)
    }
}

const handleReset = () => {
    value.value = props.scriptInfo.script.code
}

const handleGenerate = async () => {
    try {
        const scriptResult = await createTsScript(props.scriptInfo.type, value.value, executor.value)
        if (scriptResult.valid) {
            const scriptInfo: ScriptInfo<Name> = {
                ...props.scriptInfo,
                script: scriptResult.script
            }
            const scriptStore: ScriptsStore<any> = createScriptsStore([scriptInfo])
            generateResult.value = modelGenerate(
                getContext(),
                contextDataToSubIds(contextData.value),
                scriptStore
            )
        } else {
            receiveError(scriptResult.error)
        }
    } catch (e) {
        receiveError(e)
    }
}

const handleSubmit = async () => {
    try {
        const scriptResult = await createTsScript(props.scriptInfo.type, value.value, executor.value)
        if (scriptResult.valid) {
            const scriptInfo: ScriptInfo<Name> = {
                ...props.scriptInfo,
                script: scriptResult.script
            }
            emits('submit', scriptInfo)
        } else {
            receiveError(scriptResult.error)
        }
    } catch (e) {
        receiveError(e)
    }
}
</script>

<template>
    <div class="generate-script-editor">
        <div class="top-toolbar">
            <button @click="handleReset">Reset</button>
        </div>

        <TsScriptEditor
            class="script"
            v-model="value"
            :executor="executor"
        />

        <div class="tail-toolbar">
            <button @click="handleGenerate">Generate</button>
            <button @click="handleSubmit">Submit</button>
        </div>

        {{ generateResult }}
        {{ errorMessage }}
    </div>
</template>

<style scoped>
.generate-script-editor {
    height: 100%;
    width: 100%;
}

.top-toolbar {
    height: 1.5rem;
}

.script {
    height: calc(100% - 3rem);
}

.tail-toolbar {
    height: 1.5rem;
}
</style>
