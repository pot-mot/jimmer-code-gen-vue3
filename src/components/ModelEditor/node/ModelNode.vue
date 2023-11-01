<template>
	<el-text v-if="table" class="node">
		<table ref="wrapper" class="table-wrapper">
			<tr class="tableName">
				<td colspan="2">
					<span class="icon">
						<TableIcon :type="table.type"></TableIcon>
					</span>
					<span>{{ table.name }}</span>
					<Comment :comment="table.comment"></Comment>
				</td>
			</tr>
			<tr v-for="column in table.columns" class="column">
				<td>
					<span class="icon">
						<ColumnIcon :column="column"></ColumnIcon>
					</span>
					<span>{{ column.name }}</span>
					<Comment :comment="column.comment"></Comment>
				</td>
				<td style="text-align: right;">
					<span class="type">{{ column.type }}</span>
				</td>
			</tr>
		</table>
	</el-text>
</template>

<style lang="scss" scoped>
.node {
	padding-bottom: 10px;

	.table-wrapper {
		background-color: #fff;
		border: 1px solid #000;
		border-collapse: collapse;

		&:hover {
			box-shadow: var(--el-box-shadow-dark);
		}

		.tableName, .column {
			white-space: nowrap;
			height: 30px;
			line-height: 30px;
		}

		.icon, .type {
			padding: 0 0.5em;
		}

		.tableName {
			text-align: center;
			border-bottom: 1px solid var(--common-color);
			font-size: 16px;
		}

		.column {
			font-size: 14px;
		}
	}
}

.x6-node-selected .table-wrapper {
	outline: 2px solid var(--highlight-color);
	outline-offset: 2px;
}
</style>

<script lang='ts' setup>
import {inject, nextTick, onMounted, ref} from "vue";
import {GenTableColumnView} from "../../../api/__generated/model/static";
import {Node} from '@antv/x6'
import {ElText} from "element-plus";
import ColumnIcon from "../../icons/database/ColumnIcon.vue";
import TableIcon from "../../icons/database/TableIcon.vue";
import Comment from "../../common/Comment.vue";

const wrapper = ref<HTMLElement | null>()

const getNode = inject<() => Node>("getNode")!;

const table = ref<GenTableColumnView>()

onMounted(() => {
	const node = getNode()
	table.value = node.getData().table

	nextTick(() => {
		if (!wrapper.value) return

		node.getData().wrapper = wrapper

		const resize = () => {
			if (!wrapper.value) return
			node.resize(wrapper.value.clientWidth, wrapper.value.clientHeight)
		}

		resize()

		const wrapperResizeObserver = new ResizeObserver(() => {
			resize()
		})

		wrapperResizeObserver.observe(wrapper.value)
	})
});
</script>
