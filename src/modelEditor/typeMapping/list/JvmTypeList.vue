<script setup lang="ts">
import EditList from '@/components/list/selectableList/EditList.vue';
import {useTypeMapping} from '@/modelEditor/typeMapping/useTypeMapping.ts';
import type {JvmTypeInput, JvmTypeUpdateInput, JvmTypeView} from '@/api/__generated/model/static';
import {type ComponentPublicInstance, ref, watch, type WatchStopHandle} from 'vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import {cloneDeepReadonlyRaw} from '@/utils/type/cloneDeepReadonly.ts';
import JvmTypeEditor from '@/modelEditor/typeMapping/item/JvmTypeEditor.vue';
import JvmTypeViewer from '@/modelEditor/typeMapping/item/JvmTypeViewer.vue';
import IconCheck from '@/components/icons/IconCheck.vue';
import IconRefresh from '@/components/icons/IconRefresh.vue';
import {validateJvmType} from '@/type/__generated/jsonSchema/items/JvmType.ts';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconClose from '@/components/icons/IconClose.vue';
import {translate} from '@/store/i18nStore.ts';
import {type CommandDefinition, useCommandHistory} from '@/history/commandHistory.ts';
import {debounce} from 'lodash-es';
import {judgeTargetIsInteraction} from '@/utils/event/judgeEventTarget.ts';
import IconCaretUp from '@/components/icons/IconCaretUp.vue';
import IconCaretDown from '@/components/icons/IconCaretDown.vue';
import {sendConfirm} from '@/components/confirm/confirmApi.ts';

const {jvmTypes, jvmTypeOps} = useTypeMapping();

const isEdit = ref(false);
const jvmTypeInputs = ref<JvmTypeInput[]>([]);

const beforePaste = (jvmTypes: JvmTypeInput[]) => {
    for (const jvmType of jvmTypes) {
        jvmType.id = undefined;
    }
};

const history = useCommandHistory<{
    change: CommandDefinition<
        DeepReadonly<{
            newValue: JvmTypeInput[];
            oldValue: JvmTypeInput[];
        }>
    >;
}>();

let oldJvmTypeInputs: DeepReadonly<JvmTypeInput[]> | undefined;
const debounceSynUpdate = debounce(async (inputs: JvmTypeInput[]) => {
    const clonedInputs = cloneDeepReadonlyRaw<JvmTypeInput[]>(inputs);
    if (oldJvmTypeInputs !== undefined) {
        history.executeCommand('change', {
            newValue: clonedInputs,
            oldValue: oldJvmTypeInputs,
        });
    }
    oldJvmTypeInputs = clonedInputs;
}, 500);

let stopWatch: WatchStopHandle | undefined;
const addWatcher = () => {
    stopWatch = watch(
        () => jvmTypeInputs.value,
        (inputs) => {
            debounceSynUpdate(inputs);
        },
        {deep: true},
    );
};
history.registerCommand('change', {
    applyAction: (options) => {
        stopWatch?.();
        jvmTypeInputs.value = cloneDeepReadonlyRaw<JvmTypeInput[]>(options.newValue);
        addWatcher();
        return options;
    },
    revertAction: (options) => {
        stopWatch?.();
        jvmTypeInputs.value = cloneDeepReadonlyRaw<JvmTypeInput[]>(options.oldValue);
        addWatcher();
        return options;
    },
});

const startEdit = () => {
    viewEditMap.value.clear();
    jvmTypeInputs.value = cloneDeepReadonlyRaw<JvmTypeInput[]>(jvmTypes.value);
    oldJvmTypeInputs = cloneDeepReadonlyRaw<JvmTypeInput[]>(jvmTypes.value);
    addWatcher();
    isEdit.value = true;
};

const handleCancel = () => {
    history.clean();
    stopWatch?.();
    isEdit.value = false;
};

const jvmTypeEditorRefs = ref<(ComponentPublicInstance<typeof JvmTypeEditor> | null)[]>([]);
const setJvmTypeEditorRef = (
    index: number,
    ref: Element | ComponentPublicInstance<typeof JvmTypeEditor> | null,
) => {
    if (ref instanceof Element) {
        jvmTypeEditorRefs.value[index] = null;
    } else {
        jvmTypeEditorRefs.value[index] = ref;
    }
};
const handleSubmit = async () => {
    for (const editor of jvmTypeEditorRefs.value) {
        if (editor !== null && !editor.validateForm()) return;
    }
    await jvmTypeOps.save(jvmTypeInputs.value);
    history.clean();
    stopWatch?.();
    isEdit.value = false;
};

const defaultJvmType = (): JvmTypeInput => {
    return {
        jvmSource: 'ANY',
        typeExpression: '',
        serialized: false,
        extraImports: [],
        extraAnnotations: [],
        sqlMatchRules: [],
        tsMatchRules: [],
    };
};

const removeItem = (index: number) => {
    jvmTypeInputs.value.splice(index, 1);
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

const viewEditMap = ref(new Map<string, JvmTypeUpdateInput>());

const editViewItem = (item: DeepReadonly<JvmTypeView>) => {
    viewEditMap.value.set(item.id, cloneDeepReadonlyRaw<JvmTypeUpdateInput>(item));
};

const confirmViewItem = async (id: string, index: number) => {
    const item = viewEditMap.value.get(id);
    if (!item) return;

    const editor = jvmTypeEditorRefs.value[index];
    if (!editor) return;
    if (!editor.validateForm()) return;

    await jvmTypeOps.update([item]);
    viewEditMap.value.delete(item.id);
};

const cancelViewItem = (index: number) => {
    const item = jvmTypes.value[index];
    if (!item) return;
    viewEditMap.value.delete(item.id);
};

const deleteViewItem = async (item: DeepReadonly<JvmTypeView>) => {
    await sendConfirm({
        title: translate({key: 'delete_confirm_title', args: [translate('jvm_type')]}),
        content: translate({
            key: 'delete_confirm_content',
            args: [` ${translate('jvm_type')}[${item.typeExpression}] `],
        }),
        onConfirm: async () => {
            await jvmTypeOps.delete([item.id]);
        },
    });
};

const moveUp = async (index: number) => {
    if (index < 1) return;
    const currentItem = jvmTypes.value[index];
    const prevItem = jvmTypes.value[index - 1];
    if (!currentItem || !prevItem) return;

    await jvmTypeOps.updateOrder([
        {id: currentItem.id, orderKey: index - 1},
        {id: prevItem.id, orderKey: index},
    ]);
};

const moveDown = async (index: number) => {
    if (index >= jvmTypes.value.length - 1) return;
    const currentItem = jvmTypes.value[index];
    const nextItem = jvmTypes.value[index + 1];
    if (!currentItem || !nextItem) return;

    await jvmTypeOps.updateOrder([
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
            v-model:lines="jvmTypeInputs"
            :default-line="defaultJvmType"
            :json-schema-validate="validateJvmType"
            :before-paste="beforePaste"
        >
            <template #line="{index}">
                <div class="edit-line">
                    <JvmTypeEditor
                        v-model="jvmTypeInputs[index]!!"
                        :ref="(el) => setJvmTypeEditorRef(index, el)"
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
                @click="jvmTypeOps.refresh()"
                class="refresh-button"
            >
                <IconRefresh />
                {{ translate('refresh') }}
            </button>
        </div>

        <ul>
            <li
                v-for="(item, index) of jvmTypes"
                :key="item.id"
            >
                <template v-if="viewEditMap.has(item.id)">
                    <JvmTypeEditor
                        :model-value="viewEditMap.get(item.id)!!"
                        @update:model-value="
                            (value) => viewEditMap.set(item.id, value as JvmTypeUpdateInput)
                        "
                        :ref="(el) => setJvmTypeEditorRef(index, el)"
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
                    </JvmTypeEditor>
                </template>
                <template v-else>
                    <JvmTypeViewer
                        :jvm-type="item"
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
                                    :disabled="index >= jvmTypes.length - 1"
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
                    </JvmTypeViewer>
                </template>
            </li>
        </ul>
    </div>
</template>

<style scoped>
@import 'TypeListStyles.css';
</style>
