<script lang="ts" setup>
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import TableItem from "./TableItem.vue";
import AssociationItem from "./AssociationItem.vue";
import Details from "@/components/global/common/Details.vue";
import EnumItem from "@/components/pages/ModelEditor/menu/EnumItem.vue";
import {computed, ref} from 'vue'
import {
	AssociationItemShowType,
	AssociationItemShowType_CONSTANTS
} from "@/components/pages/ModelEditor/menu/AssociationItemShowType.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import {useDataSourceLoadDialogStore} from "@/store/modelEditor/DataSourceLoadDialogStore.ts";
import {useModelLoadDialogStore} from "@/store/modelEditor/ModelLoadDialogStore.ts";
import {
	GenModelInput_TargetOf_enums,
	GenModelInput_TargetOf_subGroups,
	GenTableModelInput,
	Pair
} from "@/api/__generated/model/static";
import {UnwrapRefSimple} from "@/declare/UnwrapRefSimple.ts";
import {Node} from "@antv/x6";
import SubGroupItem from "@/components/pages/ModelEditor/menu/SubGroupItem.vue";

const i18nStore = useI18nStore()

const {MODEL, MODEL_EDITOR, VIEW} = useModelEditorStore()

const dataSourceLoadDialogStore = useDataSourceLoadDialogStore()

const modelLoadDialogStore = useModelLoadDialogStore()

const noGroupTableNodePairs = computed(() => {
	return MODEL.tableNodePairs.filter(it => it.first.subGroup === undefined)
})
const noGroupEnums = computed(() => {
	return MODEL.enums.filter(it => it.subGroup === undefined)
})

const subGroups = computed<Array<GenModelInput_TargetOf_subGroups & {
	tableNodePairs: Array<Pair<GenTableModelInput, UnwrapRefSimple<Node>>>,
	enums: Array<GenModelInput_TargetOf_enums>,
}>>(() => {
	return MODEL.subGroups.map(group => {
		const tableNodePairs = MODEL.tableNodePairs.filter(it => it.first.subGroup?.name === group.name)
		const enums = MODEL.enums.filter(it => it.subGroup?.name === group.name)

		return {
			...group,
			tableNodePairs,
			enums,
		}
	})
})

const associationEdgePairs = computed(() => {
	return MODEL.associationEdgePairs
})

const associationItemShowType = ref<AssociationItemShowType>('NAME')

const toggleEdgeShow = () => {
	const currentIndex = AssociationItemShowType_CONSTANTS.indexOf(associationItemShowType.value)
	associationItemShowType.value = AssociationItemShowType_CONSTANTS[currentIndex + 1 < AssociationItemShowType_CONSTANTS.length ? currentIndex + 1 : 0]
}

const formattedEdgeShowType = computed(() => {
	switch (associationItemShowType.value) {
		case "NAME":
			return i18nStore.translate('LABEL_ModelEditorMainMenu_associationShow_nameOnly')
		case "TABLE":
			return i18nStore.translate('LABEL_ModelEditorMainMenu_associationShow_joinTable')
		case "COLUMN":
			return i18nStore.translate('LABEL_ModelEditorMainMenu_associationShow_joinColumn')
	}
})
</script>

<template>
	<div>
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

				<Details v-for="subGroup of subGroups" open>
					<template #title>
						<SubGroupItem :sub-group="subGroup"/>
					</template>

					<TableItem
						v-for="{first: table, second: node} in subGroup.tableNodePairs"
						:key="node.id"
						:table="table"
						:node="node"
					/>

					<div
						class="splitter"
						v-if="subGroup.tableNodePairs.length > 0 && subGroup.tableNodePairs.length > 0"
					/>

					<EnumItem
						v-for="genEnum in subGroup.enums"
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
					<el-button style="margin-left: 0.5em;" @click="toggleEdgeShow">
						{{ formattedEdgeShowType }}
					</el-button>
				</div>
			</template>

			<div style="padding-bottom: 1em;">
				<AssociationItem
					v-for="{first: association, second: edge} in associationEdgePairs"
					:key="edge.id"
					:association="association"
					:edge="edge"
					:show-type="associationItemShowType"/>
			</div>
		</Details>
	</div>
</template>

<style scoped>
.splitter {
	width: 60%;
	height: 1px;
	background-color: var(--el-border-color);
	margin-top: 0.5em;
}
</style>
