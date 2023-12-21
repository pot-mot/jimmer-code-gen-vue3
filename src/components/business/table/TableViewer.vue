<script lang="ts" setup>
import {GenTableAssociationsView} from "@/api/__generated/model/static";
import ColumnIcon from "@/components/global/icons/database/ColumnIcon.vue";
import Comment from "@/components/global/common/Comment.vue";

interface TableViewerProps {
	table: GenTableAssociationsView
}

defineProps<TableViewerProps>()
</script>

<template>
	<el-form v-if="table">
		<el-text>
			{{ table.name }}
			{{ table.type }}
			{{ table.comment }}
		</el-text>

		<el-input :model-value="table.remark" type="textarea" readonly></el-input>

		<div class="column-line" v-for="column in table.columns">
			<span>
				<ColumnIcon :column="column"></ColumnIcon>
			</span>
			<el-text>
				{{ column.name }}
				<Comment :comment="column.comment"></Comment>
			</el-text>

			<el-text>
				{{ column.defaultValue }}
			</el-text>

			<el-text>
				{{ column.remark }}
			</el-text>
		</div>
	</el-form>
</template>

<style scoped>
.column-line {
	display: grid;
	grid-template-columns: 1.5em 15em 10em 1fr 1fr;
	line-height: 1.5em;
	white-space: nowrap;
}
</style>
