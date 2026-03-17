<script setup lang="ts">
import EditList from '@/components/list/selectableList/EditList.vue';
import {useTypeMapping} from '@/modelEditor/typeMapping/useTypeMapping.ts';
import type {SqlTypeInput, SqlTypeUpdateInput, SqlTypeView} from '@/api/__generated/model/static';
import {type ComponentPublicInstance, ref, watch, type WatchStopHandle} from 'vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import {cloneDeepReadonlyRaw} from '@/utils/type/cloneDeepReadonly.ts';
import SqlTypeEditor from '@/modelEditor/typeMapping/item/SqlTypeEditor.vue';
import SqlTypeViewer from '@/modelEditor/typeMapping/item/SqlTypeViewer.vue';
import IconCheck from '@/components/icons/IconCheck.vue';
import IconRefresh from '@/components/icons/IconRefresh.vue';
import {validateSqlType} from '@/type/__generated/jsonSchema/items/SqlType.ts';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconClose from '@/components/icons/IconClose.vue';
import {translate} from '@/store/i18nStore.ts';
import {type CommandDefinition, useCommandHistory} from '@potmot/command-history';
import {debounce} from 'lodash-es';
import {judgeTargetIsInteraction} from '@/utils/event/judgeEventTarget.ts';
import IconCaretUp from '@/components/icons/IconCaretUp.vue';
import IconCaretDown from '@/components/icons/IconCaretDown.vue';
import {sendConfirm} from '@/components/confirm/confirmApi.ts';

const {sqlTypes, sqlTypeOps} = useTypeMapping();

const isEdit = ref(false);
const sqlTypeInputs = ref<SqlTypeInput[]>([]);

const beforePaste = (sqlTypes: SqlTypeInput[]) => {
    for (const sqlType of sqlTypes) {
        sqlType.id = undefined;
    }
};

const history = useCommandHistory<{
    change: CommandDefinition<
        DeepReadonly<{
            newValue: SqlTypeInput[];
            oldValue: SqlTypeInput[];
        }>
    >;
}>();

let oldSqlTypeInputs: DeepReadonly<SqlTypeInput[]> | undefined;
const debounceSynUpdate = debounce(async (inputs: SqlTypeInput[]) => {
    const clonedInputs = cloneDeepReadonlyRaw<SqlTypeInput[]>(inputs);
    if (oldSqlTypeInputs !== undefined) {
        history.executeCommand('change', {
            newValue: clonedInputs,
            oldValue: oldSqlTypeInputs,
        });
    }
    oldSqlTypeInputs = clonedInputs;
}, 500);

let stopWatch: WatchStopHandle | undefined;
const addWatcher = () => {
    stopWatch = watch(
        () => sqlTypeInputs.value,
        (inputs) => {
            debounceSynUpdate(inputs);
        },
        {deep: true},
    );
};
history.registerCommand('change', {
    applyAction: (options) => {
        stopWatch?.();
        sqlTypeInputs.value = cloneDeepReadonlyRaw<SqlTypeInput[]>(options.newValue);
        addWatcher();
        return options;
    },
    revertAction: (options) => {
        stopWatch?.();
        sqlTypeInputs.value = cloneDeepReadonlyRaw<SqlTypeInput[]>(options.oldValue);
        addWatcher();
        return options;
    },
});

const startEdit = () => {
    viewEditMap.value.clear();
    sqlTypeInputs.value = cloneDeepReadonlyRaw<SqlTypeInput[]>(sqlTypes.value);
    oldSqlTypeInputs = cloneDeepReadonlyRaw<SqlTypeInput[]>(sqlTypes.value);
    addWatcher();
    isEdit.value = true;
};

const handleCancel = () => {
    history.clean();
    stopWatch?.();
    isEdit.value = false;
};

const sqlTypeEditorRefs = ref<(ComponentPublicInstance<typeof SqlTypeEditor> | null)[]>([]);
const setSqlTypeEditorRef = (
    index: number,
    ref: Element | ComponentPublicInstance<typeof SqlTypeEditor> | null,
) => {
    if (ref instanceof Element) {
        sqlTypeEditorRefs.value[index] = null;
    } else {
        sqlTypeEditorRefs.value[index] = ref;
    }
};
const handleSubmit = async () => {
    for (const editor of sqlTypeEditorRefs.value) {
        if (editor !== null && !editor.validateForm()) return;
    }
    await sqlTypeOps.save(sqlTypeInputs.value);
    history.clean();
    stopWatch?.();
    isEdit.value = false;
};

const defaultSqlType = (): SqlTypeInput => {
    return {
        type: '',
        databaseSource: 'ANY',
        dataSize: undefined,
        numericPrecision: undefined,
        defaultValue: undefined,
        jvmMatchRules: [],
        tsMatchRules: [],
    };
};

const removeItem = (index: number) => {
    sqlTypeInputs.value.splice(index, 1);
};

const handleEditKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
        e.preventDefault();
        handleCancel();
    } else if (e.ctrlKey || e.metaKey) {
        if (e.key === 's' || e.key === 'S') {
            if (judgeTargetIsInteraction(e)) return;
            e.preventDefault();
            handleSubmit();
        } else if (e.key === 'z' || e.key === 'Z') {
            if (e.shiftKey) {
                e.preventDefault();
                history.redo();
            } else {
                e.preventDefault();
                history.undo();
            }
        } else if (e.key === 'y' || e.key === 'Y') {
            e.preventDefault();
            history.redo();
        }
    }
};

const viewEditMap = ref(new Map<string, SqlTypeUpdateInput>());

const editViewItem = (item: DeepReadonly<SqlTypeView>) => {
    viewEditMap.value.set(item.id, cloneDeepReadonlyRaw<SqlTypeUpdateInput>(item));
};

const confirmViewItem = async (id: string, index: number) => {
    const item = viewEditMap.value.get(id);
    if (!item) return;

    const editor = sqlTypeEditorRefs.value[index];
    if (!editor) return;
    if (!editor.validateForm()) return;

    await sqlTypeOps.update([item]);
    viewEditMap.value.delete(item.id);
};

const cancelViewItem = (index: number) => {
    const item = sqlTypes.value[index];
    if (!item) return;
    viewEditMap.value.delete(item.id);
};

const deleteViewItem = async (item: DeepReadonly<SqlTypeView>) => {
    await sendConfirm({
        title: translate({key: 'delete_confirm_title', args: [translate('sql_type')]}),
        content: translate({
            key: 'delete_confirm_content',
            args: [` ${translate('sql_type')}[${item.type}] `],
        }),
        onConfirm: async () => {
            await sqlTypeOps.delete([item.id]);
        },
    });
};

const moveUp = async (index: number) => {
    if (index < 1) return;
    const currentItem = sqlTypes.value[index];
    const prevItem = sqlTypes.value[index - 1];
    if (!currentItem || !prevItem) return;

    await sqlTypeOps.updateOrder([
        {id: currentItem.id, orderKey: index - 1},
        {id: prevItem.id, orderKey: index},
    ]);
};

const moveDown = async (index: number) => {
    if (index >= sqlTypes.value.length - 1) return;
    const currentItem = sqlTypes.value[index];
    const nextItem = sqlTypes.value[index + 1];
    if (!currentItem || !nextItem) return;

    await sqlTypeOps.updateOrder([
        {id: currentItem.id, orderKey: index + 1},
        {id: nextItem.id, orderKey: index},
    ]);
};
</script>

<template>
    <div
        v-if="isEdit"
        tabindex="-1"
        @keydown="handleEditKeyDown"
    >
        <EditList
            v-model:lines="sqlTypeInputs"
            :default-line="defaultSqlType"
            :json-schema-validate="validateSqlType"
            :before-paste="beforePaste"
        >
            <template #line="{index}">
                <div class="edit-line">
                    <SqlTypeEditor
                        v-model="sqlTypeInputs[index]!!"
                        :ref="(el) => setSqlTypeEditorRef(index, el)"
                    />
                    <button
                        @click="removeItem(index)"
                        class="delete-button"
                    >
                        <IconDelete />
                    </button>
                </div>
            </template>
        </EditList>

        <div class="edit-list-operation">
            <button
                @click="handleCancel"
                class="cancel-button"
            >
                <IconClose />
                {{ translate('cancel') }}
            </button>
            <button
                @click="handleSubmit"
                class="submit-button"
            >
                <IconCheck />
                {{ translate('save') }}
            </button>
        </div>
    </div>

    <div v-else>
        <div class="view-list-operation">
            <button
                @click="startEdit"
                class="edit-button"
            >
                <IconEdit />
                {{ translate('edit_all') }}
            </button>
            <button
                @click="sqlTypeOps.refresh()"
                class="refresh-button"
            >
                <IconRefresh />
                {{ translate('refresh') }}
            </button>
        </div>

        <ul>
            <li
                v-for="(item, index) of sqlTypes"
                :key="item.id"
            >
                <template v-if="viewEditMap.has(item.id)">
                    <SqlTypeEditor
                        :model-value="viewEditMap.get(item.id)!!"
                        @update:model-value="
                            (value) => viewEditMap.set(item.id, value as SqlTypeUpdateInput)
                        "
                        :ref="(el) => setSqlTypeEditorRef(index, el)"
                        class="view-edit-item"
                    >
                        <template #header>
                            <div class="view-item-actions">
                                <button
                                    @click="confirmViewItem(item.id, index)"
                                    class="confirm-button"
                                >
                                    <IconCheck />
                                </button>
                                <button
                                    @click="cancelViewItem(index)"
                                    class="cancel-button"
                                >
                                    <IconClose />
                                </button>
                            </div>
                        </template>
                    </SqlTypeEditor>
                </template>
                <template v-else>
                    <SqlTypeViewer
                        :sql-type="item"
                        class="view-item"
                    >
                        <template #header>
                            <div class="view-item-actions">
                                <button
                                    @click="editViewItem(item)"
                                    class="edit-button"
                                >
                                    <IconEdit />
                                </button>
                                <button
                                    @click="moveUp(index)"
                                    :disabled="index < 1"
                                    class="move-button"
                                >
                                    <IconCaretUp />
                                </button>
                                <button
                                    @click="moveDown(index)"
                                    :disabled="index >= sqlTypes.length - 1"
                                    class="move-button"
                                >
                                    <IconCaretDown />
                                </button>
                                <button
                                    @click="deleteViewItem(item)"
                                    class="delete-button"
                                >
                                    <IconDelete />
                                </button>
                            </div>
                        </template>
                    </SqlTypeViewer>
                </template>
            </li>
        </ul>
    </div>
</template>

<style scoped>
@import 'TypeListStyles.css';
</style>
