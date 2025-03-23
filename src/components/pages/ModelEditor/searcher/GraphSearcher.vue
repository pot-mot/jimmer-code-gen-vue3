<script lang="ts" setup>
import type {Cell, Graph} from "@antv/x6";
import Searcher from "@/components/global/search/Searcher.vue";
import {focus} from "@/components/global/graphEditor/view/viewOperation.ts"
import {computed, type Ref, ref} from "vue";
import {UnwrapRefSimple} from "@/declare/UnwrapRefSimple.ts";
import {ASSOCIATION_EDGE, TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {matchByKeywords, matchStrByKeywords} from "@/components/global/match/matchByKeywords.ts";
import {
    GenAssociationModelInput,
    GenTableModelInput,
    GenTableModelInput_TargetOf_superTables
} from "@/api/__generated/model/static";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import GraphSearcherTableItem from "@/components/pages/ModelEditor/searcher/GraphSearcherTableItem.vue";
import GraphSearcherAssociationItem from "@/components/pages/ModelEditor/searcher/GraphSearcherAssociationItem.vue";
import {AssociationType, AssociationType_CONSTANTS} from "@/api/__generated/model/enums";

const i18nStore = useI18nStore()

const props = defineProps<{
    graph: Graph,
}>()

const initW = ref(400)

const initX = ref(document.documentElement.clientWidth - initW.value - 100)

const searchData = ref<{
    tableKeywords: string,
    columnKeywords: string,
    enumKeywords: string,
    indexKeywords: string,
    superTableKeywords: string,
    associationKeywords: string,
    associationType: AssociationType | undefined
}>({
    tableKeywords: "",
    columnKeywords: "",
    enumKeywords: "",
    indexKeywords: "",
    superTableKeywords: "",
    associationKeywords: "",
    associationType: undefined
})

const tableKeywords = computed(() => searchData.value.tableKeywords.split(/\s+/).filter(it => it.length > 0))
const columnKeywords = computed(() => searchData.value.columnKeywords.split(/\s+/).filter(it => it.length > 0))
const enumKeywords = computed(() => searchData.value.enumKeywords.split(/\s+/).filter(it => it.length > 0))
const indexKeywords = computed(() => searchData.value.indexKeywords.split(/\s+/).filter(it => it.length > 0))
const superTableKeywords = computed(() => searchData.value.superTableKeywords.split(/\s+/).filter(it => it.length > 0))
const associationKeywords = computed(() => searchData.value.associationKeywords.split(/\s+/).filter(it => it.length > 0))


const search = (): Cell[] => {
    const isTableSearchEmpty =
        tableKeywords.value.length === 0 &&
        columnKeywords.value.length === 0 &&
        indexKeywords.value.length === 0 &&
        enumKeywords.value.length === 0 &&
        superTableKeywords.value.length === 0

    const isAssociationSearchEmpty =
        associationKeywords.value.length === 0 &&
        searchData.value.associationType === undefined

    return props.graph.getCells().filter(cell => {
        if (cell.shape === TABLE_NODE) {
            if (isTableSearchEmpty) return false

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
            if (isAssociationSearchEmpty) return false

            const association = cell.getData().association as GenAssociationModelInput | undefined
            if (association) {
                const matchByAssociationKeywords = associationKeywords.value.length > 0 ?
                    matchByKeywords(association, associationKeywords.value, ['name']) :
                    true

                if (!matchByAssociationKeywords) return false

                return searchData.value.associationType !== undefined ?
                    association.type === searchData.value.associationType :
                    true
            }
        }

        return false
    })
}

const handleClickCell = (e: MouseEvent, cell: Cell) => {
    if (e.ctrlKey) {
        props.graph.select(cell)
    } else {
        focus(props.graph, cell)
    }
}

const handleClickSuperTable = (
    e: MouseEvent,
    superTable: GenTableModelInput_TargetOf_superTables
) => {
    const nameMatchNodes = props.graph.getNodes().filter(node => node.getData().table?.name === superTable.name)

    if (e.ctrlKey) {
        props.graph.select(nameMatchNodes)
    } else {
        focus(props.graph, nameMatchNodes[0])
    }
}

const searcherRef = ref<UnwrapRefSimple<{
    searchResult: Ref<Cell[]>
}> | undefined>()

const handleSelectAll = () => {
    console.log(searcherRef.value)

    const cells = searcherRef.value?.searchResult

    if (cells !== undefined)
        props.graph.select(cells)
}
</script>

<template>
    <Searcher
        ref="searcherRef"
        v-model="searchData"
        :search="search"
        :target="graph.container"
        :init-x="initX"
        :init-w="initW"
        :fit-content="false"
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
                v-model="searchData.indexKeywords"
                :placeholder="i18nStore.translate('LABEL_GraphSearcher_indexKeywords')"
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

            <hr style="margin: 0.7em 0;">

            <el-input
                v-model="searchData.associationKeywords"
                :placeholder="i18nStore.translate('LABEL_GraphSearcher_associationKeywords')"
                clearable
                @input="handleSearch"
                @change="handleSearch"
            />

            <el-select
                v-model="searchData.associationType"
                :placeholder="i18nStore.translate('LABEL_GraphSearcher_associationType')"
                clearable
                filterable
                @change="handleSearch"
            >
                <el-option
                    v-for="associationType in AssociationType_CONSTANTS"
                    :value="associationType"
                />
            </el-select>

            <hr style="margin: 0.7em 0;">

            <el-button @click="handleSelectAll">
                {{ i18nStore.translate('LABEL_GraphSearcher_selectAll') }}
            </el-button>

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
                @click-table="(e) => handleClickCell(e, item)"
                @click-column="(e) => handleClickCell(e, item)"
                @click-enum="(e) => handleClickCell(e, item)"
                @click-index="(e) => handleClickCell(e, item)"
                @click-super-table="handleClickSuperTable"
            />

            <GraphSearcherAssociationItem
                v-else-if="item.shape === ASSOCIATION_EDGE"
                :association="item.getData().association"
                :association-keywords="associationKeywords"
                @click-association="(e) => handleClickCell(e, item)"
            />
        </template>
    </Searcher>
</template>
