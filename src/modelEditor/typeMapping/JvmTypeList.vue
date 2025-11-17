<script setup lang="ts">
import EditList from "@/components/list/selectableList/EditList.vue";
import {useTypeMapping} from "@/modelEditor/typeMapping/useTypeMapping.ts";
import type {JvmTypeInput} from "@/api/__generated/model/static";
import {type ComponentPublicInstance, ref, watch, type WatchStopHandle} from "vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import {cloneDeepReadonlyRaw} from "@/utils/type/cloneDeepReadonly.ts";
import JvmTypeEditor from "@/modelEditor/typeMapping/item/JvmTypeEditor.vue";
import JvmTypeViewer from "@/modelEditor/typeMapping/item/JvmTypeViewer.vue";
import IconCheck from "@/components/icons/IconCheck.vue";
import IconRefresh from "@/components/icons/IconRefresh.vue";
import {validateJvmType} from "@/type/__generated/jsonSchema/items/JvmType.ts";
import IconDelete from "@/components/icons/IconDelete.vue";
import IconClose from "@/components/icons/IconClose.vue";
import {translate} from "@/store/i18nStore.ts";
import {type CommandDefinition, useCommandHistory} from "@/history/commandHistory.ts";
import DeepReadonly from "@/type/__generated/typeDeclare/items/DeepReadonly.ts";
import {debounce} from "lodash-es";
import {judgeTargetIsInteraction} from "@/utils/event/judgeEventTarget.ts";

const {
    jvmTypes,
    saveJvmType,
    refreshJvmTypes,
} = useTypeMapping()

const isEdit = ref(false)
const jvmTypeInputs = ref<JvmTypeInput[]>([])

const beforePaste = (jvmTypes: JvmTypeInput[]) => {
    for (const jvmType of jvmTypes) {
        jvmType.id = undefined
    }
}


const history = useCommandHistory<{
    change: CommandDefinition<DeepReadonly<{
        newValue: JvmTypeInput[],
        oldValue: JvmTypeInput[],
    }>>
}>()

let oldJvmTypeInputs: DeepReadonly<JvmTypeInput[]> | undefined
const debounceSynUpdate = debounce(async (inputs: JvmTypeInput[]) => {
    if (oldJvmTypeInputs !== undefined) {
        history.executeCommand('change', {
            newValue: inputs,
            oldValue: oldJvmTypeInputs,
        })
    }
    oldJvmTypeInputs = cloneDeepReadonlyRaw(inputs)
}, 500)

let stopWatch: WatchStopHandle | undefined
const addWatcher = () => {
    stopWatch = watch(() => jvmTypeInputs.value, (inputs) => {
        debounceSynUpdate(inputs)
    }, {deep: true})
}
history.registerCommand('change', {
    applyAction: (options) => {
        stopWatch?.()
        jvmTypeInputs.value = cloneDeepReadonlyRaw<JvmTypeInput[]>(options.newValue)
        addWatcher()
        return options
    },
    revertAction: (options) => {
        stopWatch?.()
        jvmTypeInputs.value = cloneDeepReadonlyRaw<JvmTypeInput[]>(options.oldValue)
        addWatcher()
        return options
    }
})

const startEdit = () => {
    jvmTypeInputs.value = cloneDeepReadonlyRaw<JvmTypeInput[]>(jvmTypes.value)
    oldJvmTypeInputs = cloneDeepReadonlyRaw<JvmTypeInput[]>(jvmTypes.value)
    addWatcher()
    isEdit.value = true
}

const handleCancel = () => {
    history.clean()
    stopWatch?.()
    isEdit.value = false
}

const jvmTypeEditorRefs = ref<(ComponentPublicInstance<typeof JvmTypeEditor> | null)[]>([])
const setJvmTypeEditorRef = (index: number, ref: Element | ComponentPublicInstance<typeof JvmTypeEditor> | null) => {
    if (ref instanceof Element) {
        jvmTypeEditorRefs.value[index] = null
    } else {
        jvmTypeEditorRefs.value[index] = ref
    }
}
const handleSubmit = async () => {
    for (const editor of jvmTypeEditorRefs.value) {
        if (editor !== null && !editor.validateForm()) return
    }
    await saveJvmType(jvmTypeInputs.value)
    history.clean()
    stopWatch?.()
    isEdit.value = false
}

const defaultJvmType = (): JvmTypeInput => {
    return {
        jvmSource: "ANY",
        typeExpression: "",
        serialized: false,
        extraImports: [],
        extraAnnotations: [],
        sqlMatchRules: [],
        tsMatchRules: []
    }
}

const removeItem = (index: number) => {
    jvmTypeInputs.value.splice(index, 1)
}

const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 's' || e.key === 'S') {
        if (judgeTargetIsInteraction(e)) return
        e.preventDefault()
        handleSubmit()
    } else if (e.key === 'Escape') {
        e.preventDefault()
        handleCancel()
    } else if (e.ctrlKey) {
        if (e.key === 'z' || e.key === 'Z') {
            if (e.shiftKey) {
                e.preventDefault()
                history.redo()
            } else {
                e.preventDefault()
                history.undo()
            }
        } else if (e.key === 'y' || e.key === 'Y') {
            e.preventDefault()
            history.redo()
        }
    }
}
</script>

<template>
    <div v-if="isEdit" tabindex="-1" @keydown="handleKeyDown">
        <EditList
            v-model:lines="jvmTypeInputs"
            :default-line="defaultJvmType"
            :json-schema-validate="validateJvmType"
            :before-paste="beforePaste"
        >
            <template #line="{index}">
                <div class="edit-line">
                    <JvmTypeEditor v-model="jvmTypeInputs[index]!!" :ref="(el) => setJvmTypeEditorRef(index, el)"/>
                    <button @click="removeItem(index)" class="delete-button">
                        <IconDelete/>
                    </button>
                </div>
            </template>
        </EditList>

        <div class="edit-list-operation">
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

    <div v-else>
        <div class="view-list-operation">
            <button @click="startEdit" class="edit-button">
                <IconEdit/>
                {{ translate('edit') }}
            </button>
            <button @click="refreshJvmTypes" class="refresh-button">
                <IconRefresh/>
                {{ translate('refresh') }}
            </button>
        </div>

        <ul>
            <li v-for="item of jvmTypes">
                <JvmTypeViewer :jvm-type="item"/>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.view-list-operation {
    display: flex;
    gap: 0.5rem;
}

.edit-list-operation {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
}

.edit-line {
    display: grid;
    grid-template-columns: 1fr auto;
}

.delete-button {
    border: none;
    outline: none;
    border-radius: 0.25rem;
    cursor: pointer;
}

.edit-button,
.refresh-button,
.cancel-button,
.submit-button {
    display: flex;
    flex-wrap: nowrap;
    white-space: nowrap;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.5rem;
    border: var(--border);
    border-color: var(--border-color-light);
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 0.8rem;
}

.edit-button,
.cancel-button {
    border-color: var(--warning-color);
    --icon-color: var(--warning-color);
}

.submit-button {
    border-color: var(--success-color);
    --icon-color: var(--success-color);
}
</style>