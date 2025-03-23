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
import {
	GenModelInput_TargetOf_enums,
	GenModelInput_TargetOf_subGroups,
	GenTableModelInput,
	Pair
} from "@/api/__generated/model/static";
import {UnwrapRefSimple} from "@/declare/UnwrapRefSimple.ts";
import {Node} from "@antv/x6";
import SubGroupItem from "@/components/pages/ModelEditor/menu/SubGroupItem.vue";
import {judgeTargetIsInteraction} from "@/utils/clickUtils.ts";
import {handleMenuKeyEvent} from "@/components/pages/ModelEditor/menu/menuKeyEvent.ts";

const i18nStore = useI18nStore()

const {MODEL, MODEL_EDITOR, SELECT, VIEW} = useModelEditorStore()

const dataSourceLoadDialogStore = useDataSourceLoadDialogStore()

const modelLoadDialogStore = useModelLoadDialogStore()

const noGroupTableNodePairs = computed(() => {
	return MODEL.tableNodePairs.filter(it => it.first.subGroup === undefined)
})
const noGroupEnums = computed(() => {
	return MODEL.enums.filter(it => it.subGroup === undefined)
})

const subGroups = computed<Array<{
	group: GenModelInput_TargetOf_subGroups
	tableNodePairs: Array<Pair<GenTableModelInput, UnwrapRefSimple<Node>>>,
	enums: Array<GenModelInput_TargetOf_enums>,
}>>(() => {
	return MODEL.subGroups.map(group => {
		const tableNodePairs = MODEL.tableNodePairs.filter(it => it.first.subGroup?.name === group.name)
		const enums = MODEL.enums.filter(it => it.subGroup?.name === group.name)

		return {
			group,
			tableNodePairs,
			enums,
		}
	})
})

const associationEdgePairs = computed(() => {
	return MODEL.associationEdgePairs
})

const handleClickUnselect = (e: MouseEvent) => {
	if (!judgeTargetIsInteraction(e)) {
		SELECT.unselectAll()
	}
}
</script>

<template>
	<div class="model-editor-main-menu" @click="handleClickUnselect" tabindex="-1" @keydown="handleMenuKeyEvent">
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
						@click="MODEL_EDITOR.createTable(
							{x: VIEW.getCenterPoint().x * 3/4, y: VIEW.getCenterPoint().y * 3/4}
						)">
						{{ i18nStore.translate('LABEL_ModelEditorMainMenu_createTable') }}
					</el-button>

					<el-button
						style="margin-left: 0.5em;"
						@click="MODEL_EDITOR.combineTable(
							{x: VIEW.getCenterPoint().x * 3/4, y: VIEW.getCenterPoint().y * 3/4}
						)">
						{{ i18nStore.translate('LABEL_ModelEditorMainMenu_combineTable') }}
					</el-button>

					<el-button @click="MODEL_EDITOR.createEnum()">
						{{ i18nStore.translate('LABEL_ModelEditorMainMenu_createEnum') }}
					</el-button>
				</div>
			</template>

			<div style="padding-bottom: 1em;">
				<TableItem
					v-for="{first: table, second: node} in noGroupTableNodePairs"
					:key="node.id"
					:table="table"
					:node="node"
				/>

				<div
					class="splitter"
					v-if="noGroupTableNodePairs.length > 0 && noGroupEnums.length > 0"
				/>

				<EnumItem
					v-for="genEnum in noGroupEnums"
					:key="genEnum.name + genEnum.comment"
					:gen-enum="genEnum"
				/>

				<div
					class="splitter"
					v-if="(noGroupTableNodePairs.length > 0 || noGroupEnums.length > 0) && subGroups.length > 0"
				/>

				<Details v-for="{group, tableNodePairs, enums} of subGroups" :key="group.name" open>
					<template #title>
						<SubGroupItem :sub-group="group"/>
					</template>

					<TableItem
						v-for="{first: table, second: node} in tableNodePairs"
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

					<el-button style="margin-left: 0.5em;" @click="MODEL_EDITOR.createAssociation()">
						{{ i18nStore.translate('LABEL_ModelEditorMainMenu_createAssociation') }}
					</el-button>
					<el-button style="margin-left: 0.5em;" @click="MODEL_EDITOR.batchCreateAssociations()">
						{{ i18nStore.translate('LABEL_ModelEditorMainMenu_batchCreateAssociation') }}
					</el-button>
				</div>
			</template>

			<div style="padding-bottom: 1em;">
				<AssociationItem
					v-for="{first: association, second: edge} in associationEdgePairs"
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
