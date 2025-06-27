<template>
    <context-menu
        v-model:show="store.openState"
        :options="store.options"
        @close="handleClose"
    >
        <context-menu-item
            v-if="eventTargetStore.target.type === 'SubGroup' ? !!eventTargetStore.target.subGroup : true"
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
            v-if="eventTargetStore.target.type === 'Model'"
            :label="i18nStore.translate('LABEL_ModelEditorMainMenu_createSubGroup')"
            @click="handleCreateSubGroup"
        />

        <context-menu-item
            v-if="(eventTargetStore.target.type === 'Model' && GRAPH.isSelectionEmpty) || eventTargetStore.target.type === 'SubGroup'"
            :label="i18nStore.translate('LABEL_ModelEditorMainMenu_createTable')"
            @click="handleCreateTable"
        />

        <context-menu-item
            v-if="(eventTargetStore.target.type === 'Model' && MODEL.selectedTables.length > 0 && MODEL.selectedTables.length <= 2) || eventTargetStore.target.type === 'Table'"
            :label="i18nStore.translate('LABEL_ModelEditorMainMenu_createAssociation')"
            @click="handleCreateAssociation"
        />

        <context-menu-item
            v-if="(eventTargetStore.target.type !== 'Association')"
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
            :disabled="eventTargetStore.target.type === 'Model' ? GRAPH.isSelectionEmpty : false"
            :label="i18nStore.translate('BUTTON_copy')"
            @click="copy()"
            shortcut="Ctrl + C"
        >
            <template #icon>
                <CopyIcon/>
            </template>
        </context-menu-item>
        <context-menu-item
            :disabled="eventTargetStore.target.type === 'Model' ? GRAPH.isSelectionEmpty : false"
            :label="i18nStore.translate('BUTTON_cut')"
            @click="cut()"
            shortcut="Ctrl + X"
        >
            <template #icon>
                <CutIcon/>
            </template>
        </context-menu-item>
        <context-menu-item
            :label="i18nStore.translate('BUTTON_paste')"
            @click="paste()"
            shortcut="Ctrl + V"
        >
            <template #icon>
                <PasteIcon/>
            </template>
        </context-menu-item>

        <template v-if="eventTargetStore.target.type === 'Model'">
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
        </template>

        <context-menu-separator/>

        <context-menu-item
            v-if="eventTargetStore.target.type !== 'Model' && (eventTargetStore.target.type === 'SubGroup' ? !!eventTargetStore.target.subGroup : true)"
            :label="i18nStore.translate('BUTTON_delete')"
            @click="handleDelete"
            shortcut="Delete"
        >
            <template #icon>
                <el-icon size="1em" color="var(--icon-color)">
                    <Delete/>
                </el-icon>
            </template>
        </context-menu-item>
        <context-menu-item
            v-if="eventTargetStore.target.type === 'Model'"
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
            v-if="eventTargetStore.target.type === 'Table'"
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
import {useContextMenuStore} from "@/store/modelEditor/contextMenu/ContextMenuStore.ts";
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
import {useSubGroupsStore} from "@/store/modelEditor/dialogs/SubGroupsStore.ts";
import {useTablesStore} from "@/store/modelEditor/dialogs/TablesStore.ts";
import {AssociationCreateOptions, useAssociationsStore} from "@/store/modelEditor/dialogs/AssociationsStore.ts";
import {useEnumsStore} from "@/store/modelEditor/dialogs/EnumsStore.ts";
import {useTableCombineDialogStore} from "@/store/modelEditor/dialogs/TableCombineStore.ts";
import {getNodeConnectedEdges} from "@/components/global/graphEditor/selection/selectOperation.ts";
import {useEventTargetStore} from "@/store/modelEditor/eventTarget/EventTargetStore.ts";

const store = useContextMenuStore()

const i18nStore = useI18nStore()

const {GRAPH, REMOVE, MODEL, VIEW} = useModelEditorStore()

const eventTargetStore = useEventTargetStore()

const modelEditDialogStore = useModelEditDialogStore()
const subGroupDialogs = useSubGroupsStore()
const tableDialogs = useTablesStore()
const associationDialogs = useAssociationsStore()
const enumDialogs = useEnumsStore()
const tableCombineDialog = useTableCombineDialogStore()

const {copy, cut, paste} = useModelClipBoard()

const handleClose = () => {
    // 在关闭菜单时，聚焦到画布容器，以允许键盘导航
    GRAPH._graph().container.focus()
}

const handleEdit = () => {
    if (eventTargetStore.target.type === "Model") {
        modelEditDialogStore.open()
    } else if (eventTargetStore.target.type === "Table") {
        tableDialogs.edit(eventTargetStore.target.tableNodePair.node.id, eventTargetStore.target.tableNodePair.table)
    } else if (eventTargetStore.target.type === "Association") {
        associationDialogs.edit(eventTargetStore.target.associationEdgePair.edge.id, eventTargetStore.target.associationEdgePair.association)
    } else if (eventTargetStore.target.type === "Enum") {
        enumDialogs.edit(eventTargetStore.target.enum.name, eventTargetStore.target.enum)
    } else if (eventTargetStore.target.type === "SubGroup" && eventTargetStore.target.subGroup) {
        subGroupDialogs.edit(eventTargetStore.target.subGroup.name, eventTargetStore.target.subGroup)
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
    const subGroupName = eventTargetStore.getTargetSubGroupName()

    tableDialogs.create({
        subGroupName,
        ...GRAPH.mousePosition
    })
}

const handleCreateAssociation = () => {
    let options: AssociationCreateOptions | undefined = undefined

    if (eventTargetStore.target.type === "Table") {
        options = {
            sourceTableName: eventTargetStore.target.tableNodePair.table.name
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
    const subGroupName = eventTargetStore.getTargetSubGroupName()

    enumDialogs.create({
        subGroupName
    })
}

const handleCombineTable = () => {
    tableCombineDialog.open(GRAPH.mousePosition)
}

const handleDelete = () => {
    if (eventTargetStore.target.type === "Table") {
        tableDialogs.remove(eventTargetStore.target.tableNodePair)
    } else if (eventTargetStore.target.type === "Association") {
        associationDialogs.remove(eventTargetStore.target.associationEdgePair)
    } else if (eventTargetStore.target.type === "Enum") {
        enumDialogs.remove(eventTargetStore.target.enum.name)
    } else if (eventTargetStore.target.type === "SubGroup" && eventTargetStore.target.subGroup) {
        subGroupDialogs.remove(eventTargetStore.target.subGroup.name)
    }
}

const handleRemoveAssociation = () => {
    if (eventTargetStore.target.type === "Table") {
        const graph = GRAPH._graph()
        const edges = getNodeConnectedEdges(graph, [eventTargetStore.target.tableNodePair.node.id])
        REMOVE.removeCells(edges)
    }
}
</script>
