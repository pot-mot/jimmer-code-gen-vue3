<script setup lang="ts">
import EditList from '@/components/list/selectableList/EditList.vue';
import {useTypeMapping} from '@/modelEditor/typeMapping/useTypeMapping.ts';
import type {TsTypeInput, TsTypeUpdateInput, TsTypeView} from '@/api/__generated/model/static';
import {type ComponentPublicInstance, ref, watch, type WatchStopHandle} from 'vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import {cloneDeepReadonlyRaw} from '@/utils/type/cloneDeepReadonly.ts';
import TsTypeEditor from '@/modelEditor/typeMapping/item/TsTypeEditor.vue';
import TsTypeViewer from '@/modelEditor/typeMapping/item/TsTypeViewer.vue';
import IconCheck from '@/components/icons/IconCheck.vue';
import IconRefresh from '@/components/icons/IconRefresh.vue';
import {validateTsType} from '@/type/__generated/jsonSchema/items/TsType.ts';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconClose from '@/components/icons/IconClose.vue';
import {translate} from '@/store/i18nStore.ts';
import {type CommandDefinition, useCommandHistory} from '@/history/commandHistory.ts';
import {debounce} from 'lodash-es';
import {judgeTargetIsInteraction} from '@/utils/event/judgeEventTarget.ts';
import IconCaretUp from '@/components/icons/IconCaretUp.vue';
import IconCaretDown from '@/components/icons/IconCaretDown.vue';
import {sendConfirm} from '@/components/confirm/confirmApi.ts';

const {tsTypes, tsTypeOps} = useTypeMapping();

const isEdit = ref(false);
const tsTypeInputs = ref<TsTypeInput[]>([]);

const beforePaste = (tsTypes: TsTypeInput[]) => {
    for (const tsType of tsTypes) {
        tsType.id = undefined;
    }
};

const history = useCommandHistory<{
    change: CommandDefinition<
        DeepReadonly<{
            newValue: TsTypeInput[];
            oldValue: TsTypeInput[];
        }>
    >;
}>();

let oldTsTypeInputs: DeepReadonly<TsTypeInput[]> | undefined;
const debounceSynUpdate = debounce(async (inputs: TsTypeInput[]) => {
    const clonedInputs = cloneDeepReadonlyRaw<TsTypeInput[]>(inputs);
    if (oldTsTypeInputs !== undefined) {
        history.executeCommand('change', {
            newValue: clonedInputs,
            oldValue: oldTsTypeInputs,
        });
    }
    oldTsTypeInputs = clonedInputs;
}, 500);

let stopWatch: WatchStopHandle | undefined;
const addWatcher = () => {
    stopWatch = watch(
        () => tsTypeInputs.value,
        (inputs) => {
            debounceSynUpdate(inputs);
        },
        {deep: true},
    );
};
history.registerCommand('change', {
    applyAction: (options) => {
        stopWatch?.();
        tsTypeInputs.value = cloneDeepReadonlyRaw<TsTypeInput[]>(options.newValue);
        addWatcher();
        return options;
    },
    revertAction: (options) => {
        stopWatch?.();
        tsTypeInputs.value = cloneDeepReadonlyRaw<TsTypeInput[]>(options.oldValue);
        addWatcher();
        return options;
    },
});

const startEdit = () => {
    viewEditMap.value.clear();
    tsTypeInputs.value = cloneDeepReadonlyRaw<TsTypeInput[]>(tsTypes.value);
    oldTsTypeInputs = cloneDeepReadonlyRaw<TsTypeInput[]>(tsTypes.value);
    addWatcher();
    isEdit.value = true;
};

const handleCancel = () => {
    history.clean();
    stopWatch?.();
    isEdit.value = false;
};

const tsTypeEditorRefs = ref<(ComponentPublicInstance<typeof TsTypeEditor> | null)[]>([]);
const setTsTypeEditorRef = (
    index: number,
    ref: Element | ComponentPublicInstance<typeof TsTypeEditor> | null,
) => {
    if (ref instanceof Element) {
        tsTypeEditorRefs.value[index] = null;
    } else {
        tsTypeEditorRefs.value[index] = ref;
    }
};
const handleSubmit = async () => {
    for (const editor of tsTypeEditorRefs.value) {
        if (editor !== null && !editor.validateForm()) return;
    }
    await tsTypeOps.save(tsTypeInputs.value);
    history.clean();
    stopWatch?.();
    isEdit.value = false;
};

const defaultTsType = (): TsTypeInput => {
    return {
        typeExpression: '',
        extraImports: [],
        jvmMatchRules: [],
        sqlMatchRules: [],
    };
};

const removeItem = (index: number) => {
    tsTypeInputs.value.splice(index, 1);
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

const viewEditMap = ref(new Map<string, TsTypeUpdateInput>());

const editViewItem = (item: DeepReadonly<TsTypeView>) => {
    viewEditMap.value.set(item.id, cloneDeepReadonlyRaw<TsTypeUpdateInput>(item));
};

const confirmViewItem = async (id: string, index: number) => {
    const item = viewEditMap.value.get(id);
    if (!item) return;

    const editor = tsTypeEditorRefs.value[index];
    if (!editor) return;
    if (!editor.validateForm()) return;

    await tsTypeOps.update([item]);
    viewEditMap.value.delete(item.id);
};

const cancelViewItem = (index: number) => {
    const item = tsTypes.value[index];
    if (!item) return;
    viewEditMap.value.delete(item.id);
};

const deleteViewItem = async (item: DeepReadonly<TsTypeView>) => {
    await sendConfirm({
        title: translate({key: 'delete_confirm_title', args: [translate('ts_type')]}),
        content: translate({
            key: 'delete_confirm_content',
            args: [` ${translate('ts_type')}[${item.typeExpression}] `],
        }),
        onConfirm: async () => {
            await tsTypeOps.delete([item.id]);
        },
    });
};

const moveUp = async (index: number) => {
    if (index < 1) return;
    const currentItem = tsTypes.value[index];
    const prevItem = tsTypes.value[index - 1];
    if (!currentItem || !prevItem) return;

    await tsTypeOps.updateOrder([
        {id: currentItem.id, orderKey: index - 1},
        {id: prevItem.id, orderKey: index},
    ]);
};

const moveDown = async (index: number) => {
    if (index >= tsTypes.value.length - 1) return;
    const currentItem = tsTypes.value[index];
    const nextItem = tsTypes.value[index + 1];
    if (!currentItem || !nextItem) return;

    await tsTypeOps.updateOrder([
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
            v-model:lines="tsTypeInputs"
            :default-line="defaultTsType"
            :json-schema-validate="validateTsType"
            :before-paste="beforePaste"
        >
            <template #line="{index}">
                <div class="edit-line">
                    <TsTypeEditor
                        v-model="tsTypeInputs[index]!!"
                        :ref="(el) => setTsTypeEditorRef(index, el)"
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
                @click="tsTypeOps.refresh()"
                class="refresh-button"
            >
                <IconRefresh />
                {{ translate('refresh') }}
            </button>
        </div>

        <ul>
            <li
                v-for="(item, index) of tsTypes"
                :key="item.id"
            >
                <template v-if="viewEditMap.has(item.id)">
                    <TsTypeEditor
                        :model-value="viewEditMap.get(item.id)!!"
                        @update:model-value="
                            (value) => viewEditMap.set(item.id, value as TsTypeUpdateInput)
                        "
                        :ref="(el) => setTsTypeEditorRef(index, el)"
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
                    </TsTypeEditor>
                </template>
                <template v-else>
                    <TsTypeViewer
                        :ts-type="item"
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
                                    :disabled="index >= tsTypes.length - 1"
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
                    </TsTypeViewer>
                </template>
            </li>
        </ul>
    </div>
</template>

<style scoped>
@import 'TypeListStyles.css';
</style>
