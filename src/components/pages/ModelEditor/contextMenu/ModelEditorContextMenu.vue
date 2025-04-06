<template>
    <context-menu
        v-model:show="store.openState"
        :options="store.options"
        @close="handleClose"
    >
        <context-menu-item
            :label="i18nStore.translate('BUTTON_edit')"
            @click="handleEdit"
        >
            <template #icon>
                <el-icon size="1em" color="var(--icon-color)">
                    <EditPen/>
                </el-icon>
            </template>
        </context-menu-item>

        <context-menu-item
            v-if="store.target.type === 'Model'"
            :label="i18nStore.translate('LABEL_ModelEditorMainMenu_createSubGroup')"
            @click="handleCreateSubGroup"
        />

        <context-menu-item
            v-if="(store.target.type === 'Model' && GRAPH.isSelectionEmpty) || store.target.type === 'SubGroup'"
            :label="i18nStore.translate('LABEL_ModelEditorMainMenu_createTable')"
            @click="handleCreateTable"
        />

        <context-menu-item
            v-if="(store.target.type === 'Model' && MODEL.selectedTables.length > 0 && MODEL.selectedTables.length <= 2) || store.target.type === 'Table'"
            :label="i18nStore.translate('LABEL_ModelEditorMainMenu_createAssociation')"
            @click="handleCreateAssociation"
        />

        <context-menu-item
            :label="i18nStore.translate('LABEL_ModelEditorMainMenu_createEnum')"
            @click="handleCreateEnum"
        />

        <template v-if="MODEL.selectedTables.length > 1">
            <context-menu-separator/>

            <context-menu-item
                :label="i18nStore.translate('LABEL_ModelEditorMainMenu_combineTable')"
                @click="handleCombineTable"
            />
        </template>

        <context-menu-separator/>

        <context-menu-item
            :disabled="store.target.type === 'Model' ? GRAPH.isSelectionEmpty : false"
            :label="i18nStore.translate('BUTTON_copy')"
            @click="handleCopy"
            shortcut="Ctrl + C"
        >
            <template #icon>
                <CopyIcon/>
            </template>
        </context-menu-item>
        <context-menu-item
            :disabled="store.target.type === 'Model' ? GRAPH.isSelectionEmpty : false"
            :label="i18nStore.translate('BUTTON_cut')"
            @click="handleCut"
            shortcut="Ctrl + X"
        >
            <template #icon>
                <CutIcon/>
            </template>
        </context-menu-item>
        <context-menu-item
            :label="i18nStore.translate('BUTTON_paste')"
            @click="paste"
            shortcut="Ctrl + V"
        >
            <template #icon>
                <PasteIcon/>
            </template>
        </context-menu-item>

        <context-menu-separator/>

        <context-menu-group
            :label="i18nStore.translate('LABEL_ModelEditorGraph_layoutAndFit')"
        >
            <context-menu-item
                v-for="option in layoutOptions"
                :label="option.label"
                @click="option.click()"
            >
                <template #icon>
                    {{ option.icon }}
                </template>
            </context-menu-item>
        </context-menu-group>

        <context-menu-separator/>

        <context-menu-item
            v-if="store.target.type !== 'Model'"
            :label="i18nStore.translate('BUTTON_delete')"
            @click="handleDelete"
        >
            <template #icon>
                <el-icon size="1em" color="var(--icon-color)">
                    <Delete/>
                </el-icon>
            </template>
        </context-menu-item>
        <context-menu-item
            v-if="store.target.type === 'Model'"
            :disabled="GRAPH.isSelectionEmpty"
            :label="i18nStore.translate('LABEL_ModelEditorGraph_removeSelected')"
            shortcut="Delete"
            @click="REMOVE.removeSelectedCells"
        >
            <template #icon>
                <EraserIcon/>
            </template>
        </context-menu-item>
        <context-menu-item
            v-if="store.target.type === 'Table'"
            :label="i18nStore.translate('LABEL_ModelEditorGraph_removeAssociation')"
            @click="handleRemoveAssociation"
        >
            <template #icon>
                <AssociationOffIcon/>
            </template>
        </context-menu-item>
    </context-menu>
</template>

<script lang="ts" setup>
import {ContextMenu, ContextMenuGroup, ContextMenuItem, ContextMenuSeparator,} from '@imengyu/vue3-context-menu';
import {useModelEditorContextMenuStore} from "@/store/modelEditor/contextMenu/ModelEditorContextMenuStore.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import {useModelClipBoard} from "@/components/pages/ModelEditor/clipBoard/modelClipBoard.ts";
import CopyIcon from "@/components/global/icons/toolbar/CopyIcon.vue";
import CutIcon from "@/components/global/icons/toolbar/CutIcon.vue";
import PasteIcon from "@/components/global/icons/toolbar/PasteIcon.vue";
import AssociationOffIcon from "@/components/global/icons/toolbar/AssociationOffIcon.vue";
import EraserIcon from "@/components/global/icons/toolbar/EraserIcon.vue";
import {Delete, EditPen} from "@element-plus/icons-vue";
import {useModelEditDialogStore} from "@/store/modelEditor/dialogs/ModelEditDialogStore.ts";
import {useSubGroupDialogsStore} from "@/store/modelEditor/dialogs/SubGroupDialogsStore.ts";
import {useTableDialogsStore} from "@/store/modelEditor/dialogs/TableDialogsStore.ts";
import {
    AssociationCreateOptions,
    useAssociationDialogsStore
} from "@/store/modelEditor/dialogs/AssociationDialogsStore.ts";
import {useEnumDialogsStore} from "@/store/modelEditor/dialogs/EnumDialogsStore.ts";
import {useTableCombineDialogStore} from "@/store/modelEditor/dialogs/TableCombineDialogStore.ts";
import {getNodeConnectedEdges} from "@/components/global/graphEditor/selection/selectOperation.ts";

const store = useModelEditorContextMenuStore()

const i18nStore = useI18nStore()

const {GRAPH, REMOVE, MODEL, VIEW} = useModelEditorStore()
const modelEditDialogStore = useModelEditDialogStore()
const subGroupDialogs = useSubGroupDialogsStore()
const tableDialogs = useTableDialogsStore()
const associationDialogs = useAssociationDialogsStore()
const enumDialogs = useEnumDialogsStore()
const tableCombineDialog = useTableCombineDialogStore()
const {copy, cut, paste} = useModelClipBoard()

const handleClose = () => {
    // 在关闭菜单时，聚焦到画布容器，以允许键盘导航
    GRAPH._graph().container.focus()
}

const handleEdit = () => {
    if (store.target.type === "Model") {
        modelEditDialogStore.open()
    } else if (store.target.type === "Table") {
        tableDialogs.edit(store.target.tableNodePair.second.id, store.target.tableNodePair.first)
    } else if (store.target.type === "Association") {
        associationDialogs.edit(store.target.associationEdgePair.second.id, store.target.associationEdgePair.first)
    } else if (store.target.type === "Enum") {
        enumDialogs.edit(store.target.enum.name, store.target.enum)
    } else if (store.target.type === "SubGroup") {
        subGroupDialogs.edit(store.target.subGroup.name, store.target.subGroup)
    }
}

const handleCopy = () => {
    if (store.target.type === "Model") {
        copy()
    } else if (store.target.type === "Table") {
        if (GRAPH.selectedNodeMap.has(store.target.tableNodePair.second.id)) {
            copy()
        } else {
            copy({tableNodePairs: [store.target.tableNodePair]})
        }
    } else if (store.target.type === "Association") {
        if (GRAPH.selectedEdgeMap.has(store.target.associationEdgePair.second.id)) {
            copy()
        } else {
            copy({associationEdgePairs: [store.target.associationEdgePair]})
        }
    } else if (store.target.type === "Enum") {
        if (MODEL.selectedEnumMap.has(store.target.enum.name)) {
            copy()
        } else {
            copy({enumNames: [store.target.enum.name]})
        }
    } else if (store.target.type === "SubGroup") {
        if (MODEL.selectedEnumMap.has(store.target.subGroup.name)) {
            copy()
        } else {
            copy({subGroupNames: [store.target.subGroup.name]})
        }
    }
}

const handleCut = () => {
    if (store.target.type === "Model") {
        cut()
    } else if (store.target.type === "Table") {
        if (GRAPH.selectedNodeMap.has(store.target.tableNodePair.second.id)) {
            cut()
        } else {
            cut({tableNodePairs: [store.target.tableNodePair]})
        }
    } else if (store.target.type === "Association") {
        if (GRAPH.selectedEdgeMap.has(store.target.associationEdgePair.second.id)) {
            cut()
        } else {
            cut({associationEdgePairs: [store.target.associationEdgePair]})
        }
    } else if (store.target.type === "Enum") {
        if (MODEL.selectedEnumMap.has(store.target.enum.name)) {
            cut()
        } else {
            cut({enumNames: [store.target.enum.name]})
        }
    } else if (store.target.type === "SubGroup") {
        if (MODEL.selectedEnumMap.has(store.target.subGroup.name)) {
            cut()
        } else {
            cut({subGroupNames: [store.target.subGroup.name]})
        }
    }
}

const layoutOptions = [
    {
        label: i18nStore.translate('LABEL_ModelEditorGraph_layout_LR'),
        icon: '→',
        click: () => {
            VIEW.layoutDirection.value = 'LR'
            VIEW.layout()
        }
    },
    {
        label: i18nStore.translate('LABEL_ModelEditorGraph_layout_RL'),
        icon: '←',
        click: () => {
            VIEW.layoutDirection.value = 'RL'
            VIEW.layout()
        }
    },
    {
        label: i18nStore.translate('LABEL_ModelEditorGraph_layout_TB'),
        icon: '↓',
        click: () => {
            VIEW.layoutDirection.value = 'TB'
            VIEW.layout()
        }
    },
    {
        label: i18nStore.translate('LABEL_ModelEditorGraph_layout_BT'),
        icon: '↑',
        click: () => {
            VIEW.layoutDirection.value = 'BT'
            VIEW.layout()
        }
    },
]

const handleCreateSubGroup = () => {
    subGroupDialogs.create()
}

const handleCreateTable = () => {
    let subGroupName: string | undefined = undefined
    if (store.target.type === "SubGroup") {
        subGroupName = store.target.subGroup.name
    } else if (store.target.type === "Table") {
        subGroupName = store.target.tableNodePair.first.subGroup?.name
    } else if (store.target.type === "Enum") {
        subGroupName = store.target.enum.subGroup?.name
    }

    tableDialogs.create({
        subGroupName,
        ...GRAPH.mousePosition
    })
}

const handleCreateAssociation = () => {
    let options: AssociationCreateOptions | undefined = undefined

    if (store.target.type === "Table") {
        options = {
            sourceTableName: store.target.tableNodePair.first.name
        }
    } else if (MODEL.selectedTables.length > 0 && MODEL.selectedTables.length <= 2) {
        options = {
            sourceTableName: MODEL.selectedTables[0]?.name,
            targetTableName: MODEL.selectedTables[1]?.name,
        }
    }

    associationDialogs.create(options)
}

const handleCreateEnum = () => {
    let subGroupName: string | undefined = undefined
    if (store.target.type === "SubGroup") {
        subGroupName = store.target.subGroup.name
    } else if (store.target.type === "Table") {
        subGroupName = store.target.tableNodePair.first.subGroup?.name
    } else if (store.target.type === "Enum") {
        subGroupName = store.target.enum.subGroup?.name
    }

    enumDialogs.create({
        subGroupName
    })
}

const handleCombineTable = () => {
    tableCombineDialog.open(GRAPH.mousePosition)
}

const handleDelete = () => {
    if (store.target.type === "Table") {
        tableDialogs.remove(store.target.tableNodePair.second.id)
    } else if (store.target.type === "Association") {
        associationDialogs.remove(store.target.associationEdgePair.second.id)
    } else if (store.target.type === "Enum") {
        enumDialogs.remove(store.target.enum.name)
    } else if (store.target.type === "SubGroup") {
        subGroupDialogs.remove(store.target.subGroup.name)
    }
}

const handleRemoveAssociation = () => {
    if (store.target.type === "Table") {
        const graph = GRAPH._graph()
        const edges = getNodeConnectedEdges(graph, [store.target.tableNodePair.second.id])
        for (const edge of edges) {
            associationDialogs.remove(edge.id)
        }
    }
}
</script>
