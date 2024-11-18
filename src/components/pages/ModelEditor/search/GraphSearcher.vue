<script lang="ts" setup>
import type {Cell, Graph} from "@antv/x6";
import Searcher from "@/components/global/search/Searcher.vue";
import {focus} from "@/components/global/graphEditor/view/viewOperation.ts"
import Comment from "@/components/global/common/Comment.vue";
import {ref} from "vue";
import {ASSOCIATION_EDGE, TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {matchByKeywords} from "@/components/global/match/matchByKeywords.ts";
import {GenAssociationModelInput, GenTableModelInput} from "@/api/__generated/model/static";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";

const i18nStore = useI18nStore()

const props = defineProps<{
	graph: Graph,
}>()

const initW = ref(400)

const initX = ref(document.documentElement.clientWidth - initW.value - 100)

const searchData = ref({
	tableKeywords: "",
	columnKeywords: "",
	enumKeywords: "",
	superTableKeywords: "",
	associationKeywords: "",
})

const search = (
	searchData: {
		tableKeywords: string,
		columnKeywords: string,
		enumKeywords: string,
		superTableKeywords: string,
		associationKeywords: string,
	}
): Cell[] => {
	const {
		tableKeywords,
		columnKeywords,
		enumKeywords,
		superTableKeywords,
		associationKeywords
	} = searchData

	const tableKeywordList = tableKeywords.split(/\s+/).filter(it => it.length > 0)
	const columnKeywordList = columnKeywords.split(/\s+/).filter(it => it.length > 0)
	const enumKeywordList = enumKeywords.split(/\s+/).filter(it => it.length > 0)
	const superTableKeywordList = superTableKeywords.split(/\s+/).filter(it => it.length > 0)
	const associationKeywordList = associationKeywords.split(/\s+/).filter(it => it.length > 0)

	return props.graph.getCells()
		.filter(cell => {
			if (cell.shape === TABLE_NODE) {
				if (
					tableKeywordList.length === 0 &&
					columnKeywordList.length === 0 &&
					enumKeywordList.length === 0 &&
					superTableKeywordList.length === 0
				) return false

				const table = cell.getData().table as GenTableModelInput | undefined
				if (table) {
					const matchByTableKeywords = tableKeywordList.length > 0 ?
						matchByKeywords(table, tableKeywordList, ['name', 'comment']) :
						true

					if (!matchByTableKeywords) return false

					const matchByColumnKeywords = columnKeywordList.length > 0 ?
						table.columns.some(column => matchByKeywords(column, columnKeywordList, ['name', 'comment'])) :
						true

					if (!matchByColumnKeywords) return false

					const matchByEnumKeywords = enumKeywordList.length > 0 ?
						table.columns
							.filter(it => it.enum !== undefined)
							.some(column => matchByKeywords(column.enum!!, columnKeywordList, ['name'])) :
						true

					if (!matchByEnumKeywords) return false

					return superTableKeywordList.length > 0 ?
						table.superTables.some(superTable => matchByKeywords(superTable, tableKeywordList, ['name'])) :
						true
				}
			} else if (cell.shape === ASSOCIATION_EDGE) {
				if (associationKeywordList.length === 0)
					return false

				const association = cell.getData().association as GenAssociationModelInput | undefined
				if (association) {
					return matchByKeywords(association, associationKeywordList, ['name'])
				}
			}

			return false
		})
}
</script>

<template>
	<Searcher
		v-model="searchData"
		:search="search"
		:target="graph.container"
		:init-x="initX"
		:init-w="initW"
		:init-y="40"
		@select="(item) => focus(props.graph, item)"
	>
		<template #input="{handleSearch}">
			<el-input
				v-model="searchData.tableKeywords"
				:placeholder="i18nStore.translate('LABEL_GraphSearcher_tableKeywords')"
				clearable
				@input="handleSearch"
				@change="handleSearch"
			/>

			<el-input
				v-model="searchData.columnKeywords"
				:placeholder="i18nStore.translate('LABEL_GraphSearcher_columnKeywords')"
				clearable
				@input="handleSearch"
				@change="handleSearch"
			/>

			<el-input
				v-model="searchData.enumKeywords"
				:placeholder="i18nStore.translate('LABEL_GraphSearcher_enumKeywords')"
				clearable
				@input="handleSearch"
				@change="handleSearch"
			/>

			<el-input
				v-model="searchData.superTableKeywords"
				:placeholder="i18nStore.translate('LABEL_GraphSearcher_superTableKeywords')"
				clearable
				@input="handleSearch"
				@change="handleSearch"
			/>

			<el-input
				v-model="searchData.associationKeywords"
				:placeholder="i18nStore.translate('LABEL_GraphSearcher_associationKeywords')"
				clearable
				@input="handleSearch"
				@change="handleSearch"
			/>
		</template>

		<template #buttonContent="{item}">
			<span style="height: 1.5em; line-height: 1.5em; font-size: 0.9em;">
				<template v-if="item.shape === TABLE_NODE">
					<span v-text="item.getData().table.name"/>
					<Comment :comment="item.getData().table.comment"/>
				</template>
				<template v-else-if="item.shape === ASSOCIATION_EDGE">
					<span v-text="item.getData().association.name"/>
				</template>
			</span>
		</template>
	</Searcher>
</template>
