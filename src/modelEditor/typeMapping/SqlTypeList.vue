<script setup lang="ts">
import EditList from "@/components/list/selectableList/EditList.vue";
import {useTypeMapping} from "@/modelEditor/typeMapping/useTypeMapping.ts";
import type {SqlTypeInput} from "@/api/__generated/model/static";
import {type ComponentPublicInstance, ref, watch, type WatchStopHandle} from "vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import {cloneDeepReadonlyRaw} from "@/utils/type/cloneDeepReadonly.ts";
import SqlTypeEditor from "@/modelEditor/typeMapping/item/SqlTypeEditor.vue";
import SqlTypeViewer from "@/modelEditor/typeMapping/item/SqlTypeViewer.vue";
import IconCheck from "@/components/icons/IconCheck.vue";
import IconRefresh from "@/components/icons/IconRefresh.vue";
import {validateSqlType} from "@/type/__generated/jsonSchema/items/SqlType.ts";
import IconDelete from "@/components/icons/IconDelete.vue";
import IconClose from "@/components/icons/IconClose.vue";
import {translate} from "@/store/i18nStore.ts";
import {type CommandDefinition, useCommandHistory} from "@/history/commandHistory.ts";
import DeepReadonly from "@/type/__generated/typeDeclare/items/DeepReadonly.ts";
import {debounce} from "lodash-es";
import {judgeTargetIsInteraction} from "@/utils/event/judgeEventTarget.ts";

const {
    sqlTypes,
    saveSqlType,
    refreshSqlTypes,
} = useTypeMapping()

const isEdit = ref(false)
const sqlTypeInputs = ref<SqlTypeInput[]>([])

const beforePaste = (sqlTypes: SqlTypeInput[]) => {
    for (const sqlType of sqlTypes) {
        sqlType.id = undefined
    }
}

const history = useCommandHistory<{
    change: CommandDefinition<DeepReadonly<{
        newValue: SqlTypeInput[],
        oldValue: SqlTypeInput[],
    }>>
}>()

let oldSqlTypeInputs: DeepReadonly<SqlTypeInput[]> | undefined
const debounceSynUpdate = debounce(async (inputs: SqlTypeInput[]) => {
    const clonedInputs = cloneDeepReadonlyRaw<SqlTypeInput[]>(inputs)
    if (oldSqlTypeInputs !== undefined) {
        history.executeCommand('change', {
            newValue: clonedInputs,
            oldValue: oldSqlTypeInputs,
        })
    }
    oldSqlTypeInputs = clonedInputs
}, 500)

let stopWatch: WatchStopHandle | undefined
const addWatcher = () => {
    stopWatch = watch(() => sqlTypeInputs.value, (inputs) => {
        debounceSynUpdate(inputs)
    }, {deep: true})
}
history.registerCommand('change', {
    applyAction: (options) => {
        stopWatch?.()
        sqlTypeInputs.value = cloneDeepReadonlyRaw<SqlTypeInput[]>(options.newValue)
        addWatcher()
        return options
    },
    revertAction: (options) => {
        stopWatch?.()
        sqlTypeInputs.value = cloneDeepReadonlyRaw<SqlTypeInput[]>(options.oldValue)
        addWatcher()
        return options
    }
})

const startEdit = () => {
    sqlTypeInputs.value = cloneDeepReadonlyRaw<SqlTypeInput[]>(sqlTypes.value)
    oldSqlTypeInputs = cloneDeepReadonlyRaw<SqlTypeInput[]>(sqlTypes.value)
    addWatcher()
    isEdit.value = true
}

const handleCancel = () => {
    history.clean()
    stopWatch?.()
    isEdit.value = false
}

const sqlTypeEditorRefs = ref<(ComponentPublicInstance<typeof SqlTypeEditor> | null)[]>([])
const setSqlTypeEditorRef = (index: number, ref: Element | ComponentPublicInstance<typeof SqlTypeEditor> | null) => {
    if (ref instanceof Element) {
        sqlTypeEditorRefs.value[index] = null
    } else {
        sqlTypeEditorRefs.value[index] = ref
    }
}
const handleSubmit = async () => {
    for (const editor of sqlTypeEditorRefs.value) {
        if (editor !== null && !editor.validateForm()) return
    }
    await saveSqlType(sqlTypeInputs.value)
    history.clean()
    stopWatch?.()
    isEdit.value = false
}

const defaultSqlType = (): SqlTypeInput => {
    return {
        type: "",
        databaseSource: "ANY",
        dataSize: undefined,
        numericPrecision: undefined,
        defaultValue: undefined,
        jvmMatchRules: [],
        tsMatchRules: [],
    }
}

const removeItem = (index: number) => {
    sqlTypeInputs.value.splice(index, 1)
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
            v-model:lines="sqlTypeInputs"
            :default-line="defaultSqlType"
            :json-schema-validate="validateSqlType"
            :before-paste="beforePaste"
        >
            <template #line="{index}">
                <div class="edit-line">
                    <SqlTypeEditor v-model="sqlTypeInputs[index]!!" :ref="(el) => setSqlTypeEditorRef(index, el)"/>
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
            <button @click="refreshSqlTypes" class="refresh-button">
                <IconRefresh/>
                {{ translate('refresh') }}
            </button>
        </div>

        <ul>
            <li v-for="item of sqlTypes">
                <SqlTypeViewer :sql-type="item"/>
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
