<script setup lang="ts">
import {
	GenTableColumnsView_TargetOf_columns,
	GenTableColumnsView_TargetOf_columns_TargetOf_enum,
	GenTableColumnsView_TargetOf_indexes,
	GenTableModelInput,
	GenTableModelInput_TargetOf_superTables
} from "@/api/__generated/model/static";
import Comment from "@/components/global/common/Comment.vue";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import {matchByKeywords} from "@/components/global/match/matchByKeywords.ts";

const i18nStore = useI18nStore()

defineProps<{
	table: GenTableModelInput,
	tableKeywords: string[],
	columnKeywords: string[],
	enumKeywords: string[],
	indexKeywords: string[],
	superTableKeywords: string[],
}>()

const emits = defineEmits<{
	(event: "click-table", e: MouseEvent): void,
	(event: "click-superTable", e: MouseEvent, superTable: GenTableModelInput_TargetOf_superTables): void,
	(event: "click-column", e: MouseEvent, column: GenTableColumnsView_TargetOf_columns): void
	(event: "click-enum", e: MouseEvent, clickedEnum: GenTableColumnsView_TargetOf_columns_TargetOf_enum): void
	(event: "click-index", e: MouseEvent, index: GenTableColumnsView_TargetOf_indexes): void
}>()
</script>

<template>
	<div>
		<div>
			<el-button link @click="(e: MouseEvent) => emits('click-table', e)">
				{{ table.name }}
				<Comment :comment="table.comment"/>
			</el-button>
		</div>

		<template v-if="superTableKeywords.length > 0">
			<div class="title">
				<el-text>{{ i18nStore.translate('LABEL_TableForm_extendTables') }}</el-text>
			</div>
			<div v-for="superTable in table.superTables" class="item">
				<el-button link @click="(e: MouseEvent) => emits('click-superTable', e, superTable)">
					{{ superTable.name }}
				</el-button>
			</div>
		</template>

		<template v-if="columnKeywords.length > 0 || enumKeywords.length > 0">
			<div class="title">
				<el-text>{{ i18nStore.translate('LABEL_TableForm_columns') }}</el-text>
			</div>
			<div
				v-for="column in table.columns
					.filter(it =>
						matchByKeywords(it, columnKeywords, ['name', 'comment'], 'OR') ||
						(it.enum === undefined ? false : matchByKeywords(it.enum, enumKeywords, ['name'], 'OR'))
					)"
				class="item">
				<el-button link @click="(e: MouseEvent) => emits('click-column', e, column)">
					{{ column.name }}
					<Comment :comment="column.comment"/>
				</el-button>
				<el-button v-if="column.enum" link @click="(e: MouseEvent) => emits('click-enum', e, column.enum)">
					{{ column.enum.name }}
				</el-button>
			</div>
		</template>

		<template v-if="indexKeywords.length > 0">
			<div class="title">
				<el-text>{{ i18nStore.translate('LABEL_TableForm_indexes') }}</el-text>
			</div>
			<div v-for="index in table.indexes" class="item">
				<el-button link @click="(e: MouseEvent) => emits('click-index', e, index)">
					{{ index.name }}
				</el-button>
			</div>
		</template>
	</div>
</template>

<style scoped>
.title {
	padding-left: 1em;
	font-size: 0.9em;
}

.item {
	padding-left: 2em;
	font-size: 0.8em;
}
</style>
