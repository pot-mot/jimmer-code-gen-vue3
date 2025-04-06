<template>
	<context-menu
		v-model:show="store.openState"
		:options="options"
		@close="handleClose"
	>
		<context-menu-item
			:label="i18nStore.translate('BUTTON_edit')"
			@click="handleEdit"
		>
			<template #icon>
				<el-icon size="1em">
					<EditPen/>
				</el-icon>
			</template>
		</context-menu-item>

		<context-menu-item
			v-if="GRAPH.isSelectionEmpty"
			:label="i18nStore.translate('LABEL_ModelEditorMainMenu_createTable')"
			@click="handleCreateTable"
		/>

		<context-menu-item
			v-if="MODEL.selectedTables.length > 0 && MODEL.selectedTables.length < 3"
			:label="i18nStore.translate('LABEL_ModelEditorMainMenu_createAssociation')"
			@click="handleCreateAssociation"
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
			:disabled="store.openTarget?.type === 'Model' ? GRAPH.isSelectionEmpty : false"
			:label="i18nStore.translate('BUTTON_copy')"
			@click="handleCopy"
			shortcut="Ctrl + C"
		>
			<template #icon>
				<CopyIcon/>
			</template>
		</context-menu-item>
		<context-menu-item
			:disabled="store.openTarget?.type === 'Model' ? GRAPH.isSelectionEmpty : false"
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
			:disabled="GRAPH.isSelectionEmpty"
			:label="i18nStore.translate('LABEL_ModelEditorGraph_removeSelectedAssociation')"
			shortcut="Shift + Delete"
			@click="REMOVE.removeSelectedEdges"
		>
			<template #icon>
				<AssociationOffIcon/>
			</template>
		</context-menu-item>
	</context-menu>
</template>

<script lang="ts" setup>
import {
	ContextMenu,
	ContextMenuGroup,
	ContextMenuItem,
	ContextMenuSeparator,
	MenuOptions
} from '@imengyu/vue3-context-menu';
import {useModelEditorContextMenuStore} from "@/store/modelEditor/contextMenu/ModelEditorContextMenuStore.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {computed} from "vue";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import {useModelClipBoard} from "@/components/pages/ModelEditor/clipBoard/modelClipBoard.ts";
import CopyIcon from "@/components/global/icons/toolbar/CopyIcon.vue";
import CutIcon from "@/components/global/icons/toolbar/CutIcon.vue";
import PasteIcon from "@/components/global/icons/toolbar/PasteIcon.vue";
import AssociationOffIcon from "@/components/global/icons/toolbar/AssociationOffIcon.vue";
import EraserIcon from "@/components/global/icons/toolbar/EraserIcon.vue";
import {EditPen} from "@element-plus/icons-vue";
import {useModelEditDialogStore} from "@/store/modelEditor/dialogs/ModelEditDialogStore.ts";
import {useSubGroupDialogsStore} from "@/store/modelEditor/dialogs/SubGroupDialogsStore.ts";
import {useTableDialogsStore} from "@/store/modelEditor/dialogs/TableDialogsStore.ts";

const store = useModelEditorContextMenuStore()

const i18nStore = useI18nStore()

const {GRAPH, REMOVE, MODEL_EDITOR, MODEL, VIEW} = useModelEditorStore()
const modelEditDialogStore = useModelEditDialogStore()
const subGroupDialogs = useSubGroupDialogsStore()
const tableDialogs = useTableDialogsStore()
const {copy, cut, paste} = useModelClipBoard()

const options = computed<MenuOptions>(() => {
	return {
		x: GRAPH.mousePagePosition.x,
		y: GRAPH.mousePagePosition.y,
	}
})

const handleClose = () => {
	// 在关闭菜单时，聚焦到画布容器，以允许键盘导航
	GRAPH._graph().container.focus()
}

const handleEdit = () => {
	if (store.openTarget === undefined || store.openTarget.type === "Model") {
		modelEditDialogStore.open()
	} else if (store.openTarget.type === "Table") {
        tableDialogs.edit(store.openTarget.tableNodePair.second.id, store.openTarget.tableNodePair.first)
	} else if (store.openTarget.type === "Association") {
		MODEL_EDITOR.editAssociation(store.openTarget.associationEdgePair.second.id, store.openTarget.associationEdgePair.first)
	} else if (store.openTarget.type === "Enum") {
		MODEL_EDITOR.editEnum(store.openTarget.enum.name, store.openTarget.enum)
	} else if (store.openTarget.type === "SubGroup") {
        subGroupDialogs.edit(store.openTarget.subGroup.name, store.openTarget.subGroup)
	}
}

const handleCopy = () => {
	if (store.openTarget === undefined || store.openTarget.type === "Model") {
		copy()
	} else if (store.openTarget.type === "Table") {
		if (GRAPH.selectedNodeMap.has(store.openTarget.tableNodePair.second.id)) {
			copy()
		} else {
			copy({tableNodePairs: [store.openTarget.tableNodePair]})
		}
	} else if (store.openTarget.type === "Association") {
		if (GRAPH.selectedEdgeMap.has(store.openTarget.associationEdgePair.second.id)) {
			copy()
		} else {
			copy({associationEdgePairs: [store.openTarget.associationEdgePair]})
		}
	} else if (store.openTarget.type === "Enum") {
		if (MODEL.selectedEnumMap.has(store.openTarget.enum.name)) {
			copy()
		} else {
			copy({enumNames: [store.openTarget.enum.name]})
		}
	} else if (store.openTarget.type === "SubGroup") {
		if (MODEL.selectedEnumMap.has(store.openTarget.subGroup.name)) {
			copy()
		} else {
			copy({subGroupNames: [store.openTarget.subGroup.name]})
		}
	}
}

const handleCut = () => {
	if (store.openTarget === undefined || store.openTarget.type === "Model") {
		cut()
	} else if (store.openTarget.type === "Table") {
		if (GRAPH.selectedNodeMap.has(store.openTarget.tableNodePair.second.id)) {
			cut()
		} else {
			cut({tableNodePairs: [store.openTarget.tableNodePair]})
		}
	} else if (store.openTarget.type === "Association") {
		if (GRAPH.selectedEdgeMap.has(store.openTarget.associationEdgePair.second.id)) {
			cut()
		} else {
			cut({associationEdgePairs: [store.openTarget.associationEdgePair]})
		}
	} else if (store.openTarget.type === "Enum") {
		if (MODEL.selectedEnumMap.has(store.openTarget.enum.name)) {
			cut()
		} else {
			cut({enumNames: [store.openTarget.enum.name]})
		}
	} else if (store.openTarget.type === "SubGroup") {
		if (MODEL.selectedEnumMap.has(store.openTarget.subGroup.name)) {
			cut()
		} else {
			cut({subGroupNames: [store.openTarget.subGroup.name]})
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

const handleCreateAssociation = () => {
	MODEL_EDITOR.createAssociation()
}

const handleCreateTable = () => {
    tableDialogs.create(GRAPH.mousePosition)
}

const handleCombineTable = () => {
	MODEL_EDITOR.combineTable(GRAPH.mousePosition)
}
</script>
