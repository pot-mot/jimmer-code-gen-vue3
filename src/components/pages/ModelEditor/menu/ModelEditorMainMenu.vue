<script lang="ts" setup>
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import TableItem from "./TableItem.vue";
import AssociationItem from "./AssociationItem.vue";
import Details from "@/components/global/common/Details.vue";
import EnumItem from "@/components/pages/ModelEditor/menu/EnumItem.vue";
import {computed} from 'vue'
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import {useDataSourceLoadDialogStore} from "@/store/modelEditor/dialogs/DataSourceLoadDialogStore.ts";
import {useModelLoadDialogStore} from "@/store/modelEditor/dialogs/ModelLoadDialogStore.ts";
import SubGroupItem from "@/components/pages/ModelEditor/menu/SubGroupItem.vue";
import {judgeTargetIsInteraction} from "@/utils/clickUtils.ts";
import {handleMenuKeyEvent} from "@/components/pages/ModelEditor/menu/menuKeyEvent.ts";
import {useTablesStore} from "@/store/modelEditor/dialogs/TablesStore.ts";
import {useAssociationsStore} from "@/store/modelEditor/dialogs/AssociationsStore.ts";
import {useEnumsStore} from "@/store/modelEditor/dialogs/EnumsStore.ts";
import {useTableCombineDialogStore} from "@/store/modelEditor/dialogs/TableCombineStore.ts";
import {useAssociationBatchCreateStore} from "@/store/modelEditor/dialogs/AssociationBatchCreateStore.ts";
import {useContextMenuStore} from "@/store/modelEditor/contextMenu/ContextMenuStore.ts";
import {useEventTargetStore} from "@/store/modelEditor/eventTarget/EventTargetStore.ts";
import {debounce} from "lodash";

const i18nStore = useI18nStore()

const {MODEL, SELECT, VIEW} = useModelEditorStore()

const dataSourceLoadDialogStore = useDataSourceLoadDialogStore()
const modelLoadDialogStore = useModelLoadDialogStore()

const tableDialogs = useTablesStore()
const associationDialogs = useAssociationsStore()
const enumDialogs = useEnumsStore()
const tableConfineDialog = useTableCombineDialogStore()
const associationBatchCreateDialog = useAssociationBatchCreateStore()

const associationEdgePairs = computed(() => {
	return MODEL.associationEdgePairs
})

const handleClickUnselect = (e: MouseEvent) => {
	if (!judgeTargetIsInteraction(e)) {
		SELECT.unselectAll()
	}
}

const handleCreateTable = () => {
	const options = {
		x: VIEW.getCenterPoint().x * 3 / 4,
		y: VIEW.getCenterPoint().y * 3 / 4,
	}
	tableDialogs.create(options)
}

const handleCombineTable = () => {
	const options = {
		x: VIEW.getCenterPoint().x * 3 / 4,
		y: VIEW.getCenterPoint().y * 3 / 4,
	}
	tableConfineDialog.open(options)
}

const handleCreateAssociation = () => {
	const options = MODEL.selectedTables.length > 0 && MODEL.selectedTables.length <= 2 ? {
		sourceTableName: MODEL.selectedTables[0]?.name,
		targetTableName: MODEL.selectedTables[1]?.name,
	} : undefined
	associationDialogs.create(options)
}

const handleBatchCreateAssociations = () => {
	associationBatchCreateDialog.open()
}

const handleCreateEnum = () => {
	enumDialogs.create()
}


/**
 * 设置菜单 contextMenu 交互和 eventTarget
 */
const eventTargetStore = useEventTargetStore()

const handleMouseMove = debounce((e: MouseEvent) => {
	if (!judgeTargetIsInteraction(e)) {
		eventTargetStore.toDefault()
	}
}, 50)

const handleContextMenu = (e: MouseEvent) => {
	e.preventDefault()
	e.stopPropagation()
	useContextMenuStore().open(
		{x: e.pageX, y: e.pageY},
	)
}
</script>

<template>
	<div
		class="model-editor-main-menu"
		tabindex="-1"
		@click="handleClickUnselect"
		@keydown="handleMenuKeyEvent"
		@mousemove="handleMouseMove"
		@contextmenu="handleContextMenu"
	>
		<el-button @click="dataSourceLoadDialogStore.open()">
			{{ i18nStore.translate('LABEL_ModelEditorMainMenu_loadFromDataSource') }}
		</el-button>
		<el-button @click="modelLoadDialogStore.open()">
			{{ i18nStore.translate('LABEL_ModelEditorMainMenu_loadFromModel') }}
		</el-button>

		<Details open>
			<template #title>
				<div style="height: 2em; line-height: 2em;">
					<el-text>
						{{ i18nStore.translate('LABEL_ModelEditorMainMenu_dataModelTitle') }}
					</el-text>

					<el-button
						style="margin-left: 0.5em;"
						@click="handleCreateTable">
						{{ i18nStore.translate('LABEL_ModelEditorMainMenu_createTable') }}
					</el-button>

					<el-button
						style="margin-left: 0.5em;"
						@click="handleCombineTable">
						{{ i18nStore.translate('LABEL_ModelEditorMainMenu_combineTable') }}
					</el-button>

					<el-button @click="handleCreateEnum">
						{{ i18nStore.translate('LABEL_ModelEditorMainMenu_createEnum') }}
					</el-button>
				</div>
			</template>

			<div style="padding-bottom: 1em;">
				<Details v-for="{group, tableNodePairs, enums} of MODEL.subGroupDataList" :key="group?.name" open>
					<template #title>
						<SubGroupItem :sub-group="group"/>
					</template>

					<TableItem
						v-for="{table, node} in tableNodePairs"
						:key="node.id"
						:table="table"
						:node="node"
					/>

					<div
						class="splitter"
						v-if="tableNodePairs.length > 0 && enums.length > 0"
					/>

					<EnumItem
						v-for="genEnum in enums"
						:key="genEnum.name + genEnum.comment"
						:gen-enum="genEnum"
					/>
				</Details>
			</div>
		</Details>

		<Details open>
			<template #title>
				<div style="height: 2em; line-height: 2em;">
					<el-text>
						{{ i18nStore.translate('LABEL_ModelEditorMainMenu_associationTitle') }}
					</el-text>

					<el-button style="margin-left: 0.5em;" @click="handleCreateAssociation">
						{{ i18nStore.translate('LABEL_ModelEditorMainMenu_createAssociation') }}
					</el-button>
					<el-button style="margin-left: 0.5em;" @click="handleBatchCreateAssociations">
						{{ i18nStore.translate('LABEL_ModelEditorMainMenu_batchCreateAssociation') }}
					</el-button>
				</div>
			</template>

			<div style="padding-bottom: 1em;">
				<AssociationItem
					v-for="{association, edge} in associationEdgePairs"
					:key="edge.id"
					:association="association"
					:edge="edge"
				/>
			</div>
		</Details>
	</div>
</template>

<style scoped>
.model-editor-main-menu {
	padding: 0.2em 0 3em 1em;
	height: 100%;
	width: 100%;
	overflow: auto;
	white-space: nowrap;
	scrollbar-gutter: stable;
}

.splitter {
	width: 60%;
	min-width: 4em;
	max-width: 20em;
	height: 1px;
	background-color: var(--text-color);
	opacity: 0.3;
	margin-top: 0.4em;
	margin-bottom: 0.3em;
}
</style>
