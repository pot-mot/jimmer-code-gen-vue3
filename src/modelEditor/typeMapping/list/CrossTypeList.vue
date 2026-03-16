<script setup lang="ts">
import EditList from '@/components/list/selectableList/EditList.vue';
import {useTypeMapping} from '@/modelEditor/typeMapping/useTypeMapping.ts';
import type {
    CrossTypeInput,
    CrossTypeUpdateInput,
    CrossTypeView,
} from '@/api/__generated/model/static';
import {type ComponentPublicInstance, ref, watch, type WatchStopHandle} from 'vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import {cloneDeepReadonlyRaw} from '@/utils/type/cloneDeepReadonly.ts';
import CrossTypeEditor from '@/modelEditor/typeMapping/item/CrossTypeEditor.vue';
import CrossTypeViewer from '@/modelEditor/typeMapping/item/CrossTypeViewer.vue';
import IconCheck from '@/components/icons/IconCheck.vue';
import IconRefresh from '@/components/icons/IconRefresh.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconClose from '@/components/icons/IconClose.vue';
import {translate} from '@/store/i18nStore.ts';
import {type CommandDefinition, useCommandHistory} from '@/history/commandHistory.ts';
import {debounce} from 'lodash-es';
import {judgeTargetIsInteraction} from '@/utils/event/judgeEventTarget.ts';
import {validateCrossType_IdOnly} from '@/type/__generated/jsonSchema/items/CrossType_IdOnly.ts';
import IconCaretUp from '@/components/icons/IconCaretUp.vue';
import IconCaretDown from '@/components/icons/IconCaretDown.vue';
import {sendConfirm} from '@/components/confirm/confirmApi.ts';

const {crossTypes, crossTypeOps, jvmTypes, sqlTypes, tsTypes} = useTypeMapping();

const isEdit = ref(false);
const crossTypeInputs = ref<CrossTypeInput[]>([]);

const beforePaste = (crossTypes: CrossTypeInput[]) => {
    for (const crossType of crossTypes) {
        crossType.id = undefined;
    }
};

const history = useCommandHistory<{
    change: CommandDefinition<
        DeepReadonly<{
            newValue: CrossTypeInput[];
            oldValue: CrossTypeInput[];
        }>
    >;
}>();

let oldCrossTypeInputs: DeepReadonly<CrossTypeInput[]> | undefined;
const debounceSynUpdate = debounce(async (inputs: CrossTypeInput[]) => {
    const clonedInputs = cloneDeepReadonlyRaw<CrossTypeInput[]>(inputs);
    if (oldCrossTypeInputs !== undefined) {
        history.executeCommand('change', {
            newValue: clonedInputs,
            oldValue: oldCrossTypeInputs,
        });
    }
    oldCrossTypeInputs = clonedInputs;
}, 500);

let stopWatch: WatchStopHandle | undefined;
const addWatcher = () => {
    stopWatch = watch(
        () => crossTypeInputs.value,
        (inputs) => {
            debounceSynUpdate(inputs);
        },
        {deep: true},
    );
};
history.registerCommand('change', {
    applyAction: (options) => {
        stopWatch?.();
        crossTypeInputs.value = cloneDeepReadonlyRaw<CrossTypeInput[]>(options.newValue);
        addWatcher();
        return options;
    },
    revertAction: (options) => {
        stopWatch?.();
        crossTypeInputs.value = cloneDeepReadonlyRaw<CrossTypeInput[]>(options.oldValue);
        addWatcher();
        return options;
    },
});

const startEdit = () => {
    viewEditMap.value.clear();
    crossTypeInputs.value = cloneDeepReadonlyRaw<CrossTypeInput[]>(crossTypes.value);
    oldCrossTypeInputs = cloneDeepReadonlyRaw<CrossTypeInput[]>(crossTypes.value);
    addWatcher();
    isEdit.value = true;
};

const handleCancel = () => {
    history.clean();
    stopWatch?.();
    isEdit.value = false;
};

const crossTypeEditorRefs = ref<(ComponentPublicInstance<typeof CrossTypeEditor> | null)[]>([]);
const setCrossTypeEditorRef = (
    index: number,
    ref: Element | ComponentPublicInstance<typeof CrossTypeEditor> | null,
) => {
    if (ref instanceof Element) {
        crossTypeEditorRefs.value[index] = null;
    } else {
        crossTypeEditorRefs.value[index] = ref;
    }
};
const handleSubmit = async () => {
    for (const editor of crossTypeEditorRefs.value) {
        if (editor !== null && !editor.validateForm()) return;
    }
    await crossTypeOps.save(crossTypeInputs.value);
    history.clean();
    stopWatch?.();
    isEdit.value = false;
};

const defaultCrossType = (): CrossTypeInput => {
    return {
        sqlTypeId: sqlTypes.value[0]?.id ?? '',
        jvmTypeId: jvmTypes.value[0]?.id ?? '',
        tsTypeId: tsTypes.value[0]?.id ?? '',
        nullable: false,
    };
};

const removeItem = (index: number) => {
    crossTypeInputs.value.splice(index, 1);
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

const viewEditMap = ref(new Map<string, CrossTypeUpdateInput>());

const editViewItem = (item: DeepReadonly<CrossTypeView>) => {
    viewEditMap.value.set(item.id, cloneDeepReadonlyRaw<CrossTypeUpdateInput>(item));
};

const confirmViewItem = async (id: string, index: number) => {
    const item = viewEditMap.value.get(id);
    if (!item) return;

    const editor = crossTypeEditorRefs.value[index];
    if (!editor) return;
    if (!editor.validateForm()) return;

    await crossTypeOps.update([item]);
    viewEditMap.value.delete(item.id);
};

const cancelViewItem = (index: number) => {
    const item = crossTypes.value[index];
    if (!item) return;
    viewEditMap.value.delete(item.id);
};

const deleteViewItem = async (item: DeepReadonly<CrossTypeView>) => {
    await sendConfirm({
        title: translate({key: 'delete_confirm_title', args: [translate('cross_type')]}),
        content: translate({
            key: 'delete_confirm_content',
            args: [` ${translate('cross_type')} `],
        }),
        onConfirm: async () => {
            await crossTypeOps.delete([item.id]);
        },
    });
};

const moveUp = async (index: number) => {
    if (index < 1) return;
    const currentItem = crossTypes.value[index];
    const prevItem = crossTypes.value[index - 1];
    if (!currentItem || !prevItem) return;

    await crossTypeOps.updateOrder([
        {id: currentItem.id, orderKey: index - 1},
        {id: prevItem.id, orderKey: index},
    ]);
};

const moveDown = async (index: number) => {
    if (index >= crossTypes.value.length - 1) return;
    const currentItem = crossTypes.value[index];
    const nextItem = crossTypes.value[index + 1];
    if (!currentItem || !nextItem) return;

    await crossTypeOps.updateOrder([
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
            v-model:lines="crossTypeInputs"
            :default-line="defaultCrossType"
            :json-schema-validate="validateCrossType_IdOnly"
            :before-paste="beforePaste"
        >
            <template #line="{index}">
                <div class="edit-line">
                    <CrossTypeEditor v-model="crossTypeInputs[index]!!" />
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
                @click="crossTypeOps.refresh()"
                class="refresh-button"
            >
                <IconRefresh />
                {{ translate('refresh') }}
            </button>
        </div>

        <ul>
            <li
                v-for="(item, index) of crossTypes"
                :key="item.id"
            >
                <template v-if="viewEditMap.has(item.id)">
                    <div class="view-edit-item">
                        <CrossTypeEditor
                            :model-value="viewEditMap.get(item.id)!!"
                            @update:model-value="
                                (value) => viewEditMap.set(item.id, value as CrossTypeUpdateInput)
                            "
                            :ref="(el) => setCrossTypeEditorRef(index, el)"
                        />
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
                    </div>
                </template>
                <template v-else>
                    <div class="view-item">
                        <CrossTypeViewer :cross-type="item" />
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
                                :disabled="index >= crossTypes.length - 1"
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
                    </div>
                </template>
            </li>
        </ul>
    </div>
</template>

<style scoped>
@import 'TypeListStyles.css';

.view-item,
.view-edit-item {
    display: flex;
    gap: 0.5rem;
}
</style>
