<script lang="ts" setup>
import type {Cell, Graph} from "@antv/x6";
import Searcher from "@/components/global/search/Searcher.vue";
import {focus} from "@/components/global/graphEditor/view/viewOperation.ts"
import {computed, ref} from "vue";
import {ASSOCIATION_EDGE, TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {matchByKeywords, matchStrByKeywords} from "@/components/global/match/matchByKeywords.ts";
import {GenAssociationModelInput, GenTableModelInput} from "@/api/__generated/model/static";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import GraphSearcherTableItem from "@/components/pages/ModelEditor/search/GraphSearcherTableItem.vue";
import GraphSearcherAssociationItem from "@/components/pages/ModelEditor/search/GraphSearcherAssociationItem.vue";

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
	indexKeywords: "",
	superTableKeywords: "",
	associationKeywords: "",
})

const tableKeywords = computed(() => searchData.value.tableKeywords.split(/\s+/).filter(it => it.length > 0))
const columnKeywords = computed(() => searchData.value.columnKeywords.split(/\s+/).filter(it => it.length > 0))
const enumKeywords = computed(() => searchData.value.enumKeywords.split(/\s+/).filter(it => it.length > 0))
const indexKeywords = computed(() => searchData.value.indexKeywords.split(/\s+/).filter(it => it.length > 0))
const superTableKeywords = computed(() => searchData.value.superTableKeywords.split(/\s+/).filter(it => it.length > 0))
const associationKeywords = computed(() => searchData.value.associationKeywords.split(/\s+/).filter(it => it.length > 0))


const search = (): Cell[] => {
	return props.graph.getCells()
		.filter(cell => {
			if (cell.shape === TABLE_NODE) {
				if (
					tableKeywords.value.length === 0 &&
					columnKeywords.value.length === 0 &&
					indexKeywords.value.length === 0 &&
					enumKeywords.value.length === 0 &&
					superTableKeywords.value.length === 0
				) return false

				const table = cell.getData().table as GenTableModelInput | undefined
				if (table) {
					const matchByTableKeywords = tableKeywords.value.length > 0 ?
						matchByKeywords(table, tableKeywords.value, ['name', 'comment']) :
						true

					if (!matchByTableKeywords) return false

					const matchByColumnKeywords = columnKeywords.value.length > 0 ?
						matchStrByKeywords(
							table.columns.map(it => `${it.name} ${it.comment}`).join(' '),
							columnKeywords.value
						) :
						true

					if (!matchByColumnKeywords) return false

					const matchByEnumKeywords = enumKeywords.value.length > 0 ?
						matchStrByKeywords(
							table.columns.filter(it => it.enum !== undefined).map(it => it.enum!.name).join(' '),
							enumKeywords.value
						) :
						true

					if (!matchByEnumKeywords) return false

					const matchByIndexKeywords = indexKeywords.value.length > 0 ?
						matchStrByKeywords(
							table.indexes.map(it => it.name).join(' '),
							indexKeywords.value
						) :
						true

					if (!matchByIndexKeywords) return false

					return superTableKeywords.value.length > 0 ?
						matchStrByKeywords(
							table.superTables.map(it => it.name).join(' '),
							superTableKeywords.value
						) :
						true
				}
			} else if (cell.shape === ASSOCIATION_EDGE) {
				if (associationKeywords.value.length === 0)
					return false

				const association = cell.getData().association as GenAssociationModelInput | undefined
				if (association) {
					return matchByKeywords(association, associationKeywords.value, ['name'])
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

		<template #item="{item}">
			<GraphSearcherTableItem
				v-if="item.shape === TABLE_NODE"
				:table="item.getData().table"
				:table-keywords="tableKeywords"
				:column-keywords="columnKeywords"
				:enum-keywords="enumKeywords"
				:index-keywords="indexKeywords"
				:super-table-keywords="superTableKeywords"
				@click="() => focus(props.graph, item)"
			/>

			<GraphSearcherAssociationItem
				v-else-if="item.shape === ASSOCIATION_EDGE"
				:association="item.getData().association"
				:association-keywords="associationKeywords"
				@click="() => focus(props.graph, item)"
			/>
		</template>
	</Searcher>
</template>
