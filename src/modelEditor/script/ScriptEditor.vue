<script setup lang="ts" generic="Name extends ScriptTypeName">
import {type ScriptInfo} from "@/modelEditor/script/ScriptsStore.ts";
import type {ScriptTypeName} from "@/type/__generated/scriptTypeDeclare";
import TsScriptEditor from "@/components/code/scriptEditor/TsScriptEditor.vue";
import {createTsScript, TsScriptExecutor} from "@/components/code/scriptEditor/TsScriptExecutor.ts";
import {computed, ref, watch} from "vue";
import {jsonPrettyFormat} from "@/utils/json/jsonStringify.ts";
import IconCheck from "@/components/icons/IconCheck.vue";
import {translate} from "@/store/i18nStore.ts";
import JvmLanguageOrAnySelect from "@/modelEditor/modelForm/jvmLanguage/JvmLanguageOrAnySelect.vue";
import DatabaseTypeOrAnySelect from "@/modelEditor/modelForm/databaseType/DatabaseTypeOrAnySelect.vue";
import {sendConfirm} from "@/components/confirm/confirmApi.ts";
import IconClose from "@/components/icons/IconClose.vue";

const props = defineProps<{
    scriptInfo: Omit<ScriptInfo<Name>, 'id'>,
}>()

const emits = defineEmits<{
    (e: 'submit', result: Omit<ScriptInfo<Name>, 'id'>): void
    (e: 'cancel'): void
}>()

const code = ref(props.scriptInfo.script.code)
watch(() => props.scriptInfo.script.code, () => {
    code.value = props.scriptInfo.script.code
})
const errorMessage = ref<string>()

const executor = computed(() => new TsScriptExecutor(props.scriptInfo.type))

const receiveError = (error: any) => {
    if (typeof error === 'string') {
        errorMessage.value = error
    } else if (error instanceof Error) {
        console.error(error)
        errorMessage.value = error.message
    } else if (Array.isArray(error)) {
        console.error(error)
        errorMessage.value = error.join('\n')
    } else if (typeof error === 'object') {
        console.error(error)
        errorMessage.value = jsonPrettyFormat(error)
    } else {
        errorMessage.value = String(error)
    }
    sendConfirm({
        title: translate("script_error"),
        content: errorMessage.value,
    })
}

const handleCancel = () => {
    emits('cancel')
}

const handleSubmit = async () => {
    try {
        const scriptResult = await createTsScript(props.scriptInfo.type, code.value, executor.value)
        if (scriptResult.valid) {
            emits('submit', {
                ...props.scriptInfo,
                script: scriptResult.script
            })
        } else {
            receiveError(scriptResult.errorMessages)
        }
    } catch (e) {
        receiveError(e)
    }
}

const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey) {
        if (e.key === 's' || e.key === 'S') {
            e.preventDefault()
            handleSubmit()
        }
    }
}
</script>

<template>
    <div class="generate-script-editor" tabindex="-1" @keydown="handleKeyDown">
        <div class="top-toolbar">
            <input
                v-model="scriptInfo.name"
            >
            <input
                type="checkbox"
                v-model="scriptInfo.enabled"
            >
            <JvmLanguageOrAnySelect
                v-model="scriptInfo.jvmLanguage"
                style="width: 10rem;"
            />
            <DatabaseTypeOrAnySelect
                v-model="scriptInfo.databaseType"
                style="width: 12rem;"
            />
        </div>

        <TsScriptEditor
            class="script"
            v-model="code"
            :executor="executor"
        />

        <div class="tail-toolbar">
            <button @click="handleCancel" class="cancel-button">
                <IconClose/>
                {{ translate('cancel') }}
            </button>
            <button @click="handleSubmit" class="submit-button">
                <IconCheck/>
                {{ translate('save') }}
            </button>
        </div>
    </div>
</template>

<style scoped>
.generate-script-editor {
    height: 100%;
    width: 100%;
}

.top-toolbar {
    height: 2rem;
    display: flex;
    flex-wrap: nowrap;
    gap: 0.5rem;
    padding: 0 0.5rem 0.5rem;
}

.script {
    height: calc(100% - 4.5rem);
}

.tail-toolbar {
    height: 2rem;
    display: flex;
    justify-content: flex-end;
    flex-wrap: nowrap;
    gap: 0.5rem;
    padding: 0 0.5rem;
}

.cancel-button,
.submit-button {
    display: flex;
    flex-wrap: nowrap;
    white-space: nowrap;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border: var(--border);
    border-color: var(--border-color-light);
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 0.8rem;
}

.cancel-button {
    border-color: var(--warning-color);
    --icon-color: var(--warning-color);
}

.submit-button {
    border-color: var(--success-color);
    --icon-color: var(--success-color);
}
</style>
