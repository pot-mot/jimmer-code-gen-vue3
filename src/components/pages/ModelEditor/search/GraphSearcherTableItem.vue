<script setup lang="ts">
import {GenTableModelInput} from "@/api/__generated/model/static";
import Comment from "@/components/global/common/Comment.vue";

const props = defineProps<{
	table: GenTableModelInput,
	tableKeywords: string[],
	columnKeywords: string[],
	enumKeywords: string[],
	indexKeywords: string[],
	superTableKeywords: string[],
}>()
</script>

<template>
	<div>
		<el-text>{{ table.name }}</el-text>
		<Comment :comment="table.comment"/>

		<template v-if="superTableKeywords.length > 0">
			<div v-for="superTable in table.superTables">
				<el-text>{{ superTable.name }}</el-text>
			</div>
		</template>

		<template v-if="columnKeywords.length > 0 || enumKeywords.length > 0">
			<div v-for="column in table.columns">
				<el-text>{{ column.name }}</el-text>
				<Comment :comment="column.comment"/>
				<el-text v-if="column.enum">{{ column.enum.name }}</el-text>
			</div>
		</template>

		<template v-if="indexKeywords.length > 0">
			<div v-for="index in table.indexes">
				<el-text>{{ index.name }}</el-text>
			</div>
		</template>
	</div>
</template>
