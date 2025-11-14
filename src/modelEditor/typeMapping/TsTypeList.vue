<script setup lang="ts">
import EditList from "@/components/list/selectableList/EditList.vue";
import {useTypeMapping} from "@/modelEditor/typeMapping/useTypeMapping.ts";
import type {TsTypeInput} from "@/api/__generated/model/static";
import {type ComponentPublicInstance, ref, watch, type WatchStopHandle} from "vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import {cloneDeepReadonlyRaw} from "@/utils/type/cloneDeepReadonly.ts";
import TsTypeEditor from "@/modelEditor/typeMapping/item/TsTypeEditor.vue";
import TsTypeViewer from "@/modelEditor/typeMapping/item/TsTypeViewer.vue";
import IconCheck from "@/components/icons/IconCheck.vue";
import IconRefresh from "@/components/icons/IconRefresh.vue";
import {validateTsType} from "@/type/__generated/jsonSchema/items/TsType.ts";
import IconDelete from "@/components/icons/IconDelete.vue";
import IconClose from "@/components/icons/IconClose.vue";
import {translate} from "@/store/i18nStore.ts";
import {type CommandDefinition, useCommandHistory} from "@/history/commandHistory.ts";
import DeepReadonly from "@/type/__generated/typeDeclare/items/DeepReadonly.ts";
import {debounce} from "lodash-es";
import {judgeTargetIsInteraction} from "@/utils/event/judgeEventTarget.ts";

const {
    tsTypes,
    saveTsType,
    refreshTsTypes,
} = useTypeMapping()

const isEdit = ref(false)
const tsTypeInputs = ref<TsTypeInput[]>([])

const history = useCommandHistory<{
    change: CommandDefinition<DeepReadonly<{
        newValue: TsTypeInput[],
        oldValue: TsTypeInput[],
    }>>
}>()

let oldTsTypeInputs: DeepReadonly<TsTypeInput[]> | undefined
const debounceSynUpdate = debounce(async (inputs: TsTypeInput[]) => {
    if (oldTsTypeInputs !== undefined) {
        history.executeCommand('change', {
            newValue: inputs,
            oldValue: oldTsTypeInputs,
        })
    }
    oldTsTypeInputs = cloneDeepReadonlyRaw(inputs)
}, 500)

let stopWatch: WatchStopHandle | undefined
const addWatcher = () => {
    stopWatch = watch(() => tsTypeInputs.value, (inputs) => {
        debounceSynUpdate(inputs)
    }, {deep: true})
}
history.registerCommand('change', {
    applyAction: (options) => {
        stopWatch?.()
        tsTypeInputs.value = cloneDeepReadonlyRaw<TsTypeInput[]>(options.newValue)
        addWatcher()
        return options
    },
    revertAction: (options) => {
        stopWatch?.()
        tsTypeInputs.value = cloneDeepReadonlyRaw<TsTypeInput[]>(options.oldValue)
        addWatcher()
        return options
    }
})

const startEdit = () => {
    tsTypeInputs.value = cloneDeepReadonlyRaw<TsTypeInput[]>(tsTypes.value)
    oldTsTypeInputs = cloneDeepReadonlyRaw<TsTypeInput[]>(tsTypes.value)
    addWatcher()
    isEdit.value = true
}

const handleCancel = () => {
    history.clean()
    stopWatch?.()
    isEdit.value = false
}

const tsTypeEditorRefs = ref<(ComponentPublicInstance<typeof TsTypeEditor> | null)[]>([])
const setTsTypeEditorRef = (index: number, ref: Element | ComponentPublicInstance<typeof TsTypeEditor> | null) => {
    if (ref instanceof Element) {
        tsTypeEditorRefs.value[index] = null
    } else {
        tsTypeEditorRefs.value[index] = ref
    }
}
const handleSubmit = async () => {
    for (const editor of tsTypeEditorRefs.value) {
        if (editor !== null && !editor.validateForm()) return
    }
    await saveTsType(tsTypeInputs.value)
    history.clean()
    stopWatch?.()
    isEdit.value = false
}

const defaultTsType = (): TsTypeInput => {
    return {
        typeExpression: "",
        extraImports: [],
        jvmMatchRules: [],
        sqlMatchRules: []
    }
}

const removeItem = (index: number) => {
    tsTypeInputs.value.splice(index, 1)
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
            v-model:lines="tsTypeInputs"
            :default-line="defaultTsType"
            :json-schema-validate="validateTsType"
        >
            <template #line="{index}">
                <div class="edit-line">
                    <TsTypeEditor v-model="tsTypeInputs[index]!!" :ref="(el) => setTsTypeEditorRef(index, el)"/>
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
            <button @click="refreshTsTypes" class="refresh-button">
                <IconRefresh/>
                {{ translate('refresh') }}
            </button>
        </div>

        <ul>
            <li v-for="item of tsTypes">
                <TsTypeViewer :ts-type="item"/>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.view-list-operation {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
}

.edit-list-operation {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    margin-top: 0.5rem;
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
