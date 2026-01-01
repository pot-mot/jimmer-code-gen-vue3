<script setup lang="ts">
import EditList from "@/components/list/selectableList/EditList.vue";
import {useTypeMapping} from "@/modelEditor/typeMapping/useTypeMapping.ts";
import type {CrossTypeInput} from "@/api/__generated/model/static";
import {type ComponentPublicInstance, ref, watch, type WatchStopHandle} from "vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import {cloneDeepReadonlyRaw} from "@/utils/type/cloneDeepReadonly.ts";
import CrossTypeEditor from "@/modelEditor/typeMapping/item/CrossTypeEditor.vue";
import CrossTypeViewer from "@/modelEditor/typeMapping/item/CrossTypeViewer.vue";
import IconCheck from "@/components/icons/IconCheck.vue";
import IconRefresh from "@/components/icons/IconRefresh.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import IconClose from "@/components/icons/IconClose.vue";
import {translate} from "@/store/i18nStore.ts";
import {type CommandDefinition, useCommandHistory} from "@/history/commandHistory.ts";
import DeepReadonly from "@/type/__generated/typeDeclare/items/DeepReadonly.ts";
import {debounce} from "lodash-es";
import {judgeTargetIsInteraction} from "@/utils/event/judgeEventTarget.ts";
import {validateCrossType_IdOnly} from "@/type/__generated/jsonSchema/items/CrossType_IdOnly.ts";

const {
    crossTypes,
    saveCrossType,
    refreshCrossTypes,
    jvmTypes,
    sqlTypes,
    tsTypes,
} = useTypeMapping()

const isEdit = ref(false)
const crossTypeInputs = ref<CrossTypeInput[]>([])

const beforePaste = (crossTypes: CrossTypeInput[]) => {
    for (const crossType of crossTypes) {
        crossType.id = undefined
    }
}

const history = useCommandHistory<{
    change: CommandDefinition<DeepReadonly<{
        newValue: CrossTypeInput[],
        oldValue: CrossTypeInput[],
    }>>
}>()

let oldCrossTypeInputs: DeepReadonly<CrossTypeInput[]> | undefined
const debounceSynUpdate = debounce(async (inputs: CrossTypeInput[]) => {
    const clonedInputs = cloneDeepReadonlyRaw<CrossTypeInput[]>(inputs)
    if (oldCrossTypeInputs !== undefined) {
        history.executeCommand('change', {
            newValue: clonedInputs,
            oldValue: oldCrossTypeInputs,
        })
    }
    oldCrossTypeInputs = clonedInputs
}, 500)

let stopWatch: WatchStopHandle | undefined
const addWatcher = () => {
    stopWatch = watch(() => crossTypeInputs.value, (inputs) => {
        debounceSynUpdate(inputs)
    }, {deep: true})
}
history.registerCommand('change', {
    applyAction: (options) => {
        stopWatch?.()
        crossTypeInputs.value = cloneDeepReadonlyRaw<CrossTypeInput[]>(options.newValue)
        addWatcher()
        return options
    },
    revertAction: (options) => {
        stopWatch?.()
        crossTypeInputs.value = cloneDeepReadonlyRaw<CrossTypeInput[]>(options.oldValue)
        addWatcher()
        return options
    }
})

const startEdit = () => {
    crossTypeInputs.value = cloneDeepReadonlyRaw<CrossTypeInput[]>(crossTypes.value)
    oldCrossTypeInputs = cloneDeepReadonlyRaw<CrossTypeInput[]>(crossTypes.value)
    addWatcher()
    isEdit.value = true
}

const handleCancel = () => {
    history.clean()
    stopWatch?.()
    isEdit.value = false
}

const crossTypeEditorRefs = ref<(ComponentPublicInstance<typeof CrossTypeEditor> | null)[]>([])
const setCrossTypeEditorRef = (index: number, ref: Element | ComponentPublicInstance<typeof CrossTypeEditor> | null) => {
    if (ref instanceof Element) {
        crossTypeEditorRefs.value[index] = null
    } else {
        crossTypeEditorRefs.value[index] = ref
    }
}
const handleSubmit = async () => {
    for (const editor of crossTypeEditorRefs.value) {
        if (editor !== null && !editor.validateForm()) return
    }
    await saveCrossType(crossTypeInputs.value)
    history.clean()
    stopWatch?.()
    isEdit.value = false
}

const defaultCrossType = (): CrossTypeInput => {
    return {
        sqlTypeId: sqlTypes.value[0]?.id ?? "",
        jvmTypeId: jvmTypes.value[0]?.id ?? "",
        tsTypeId: tsTypes.value[0]?.id ?? "",
        nullable: false,
    }
}

const removeItem = (index: number) => {
    crossTypeInputs.value.splice(index, 1)
}

const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
        e.preventDefault()
        handleCancel()
    } else if (e.ctrlKey || e.metaKey) {
        if (e.key === 's' || e.key === 'S') {
            if (judgeTargetIsInteraction(e)) return
            e.preventDefault()
            handleSubmit()
        } else if (e.key === 'z' || e.key === 'Z') {
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
            v-model:lines="crossTypeInputs"
            :default-line="defaultCrossType"
            :json-schema-validate="validateCrossType_IdOnly"
            :before-paste="beforePaste"
        >
            <template #line="{index}">
                <div class="edit-line">
                    <CrossTypeEditor v-model="crossTypeInputs[index]!!" :ref="(el) => setCrossTypeEditorRef(index, el)"/>
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
            <button @click="refreshCrossTypes" class="refresh-button">
                <IconRefresh/>
                {{ translate('refresh') }}
            </button>
        </div>

        <ul>
            <li v-for="item of crossTypes">
                <CrossTypeViewer :cross-type="item"/>
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