<template>
	<el-text v-if="table" class="node" @dblclick="store.focus(table.id)"
			 @contextmenu="TableDialogEventBus.emit('addTableDialog', table.id)">
		<table ref="wrapper" class="table-wrapper">
			<tr class="tableName">
				<td colspan="2">
					<span class="icon">
						<TableIcon :type="table.type"></TableIcon>
					</span>
					<span>{{ table.name }}</span>
					<span class="comment">/* {{ table.comment }} */</span>
				</td>
			</tr>
			<tr v-for="column in table.columns" class="column">
				<td>
					<span class="icon">
						<ColumnIcon :column="column"></ColumnIcon>
					</span>
					<span>{{ column.name }}</span>
					<span class="comment">/* {{ column.comment }} */</span>
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

		.tableName, .column {
			white-space: nowrap;
			height: 30px;
			line-height: 30px;
		}

		.comment {
			padding: 0 0.3em;
			color: var(--el-text-color-placeholder);
			font-size: 0.8em;
			font-weight: 400;
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
	outline-offset: 4px;
}
</style>

<script lang='ts' setup>
import {inject, nextTick, onMounted, ref} from "vue";
import {GenTableColumnView} from "../../../api/__generated/model/static";
import {Node} from '@antv/x6'
import {useAssociationEditorGraphStore} from "../store/AssociationEditorGraphStore.ts";
import {TableDialogEventBus} from "../../global/TableDialogManager/TableDialogEventBus.ts";
import {ElText} from "element-plus";
import ColumnIcon from "../../icons/database/ColumnIcon.vue";
import TableIcon from "../../icons/database/TableIcon.vue";

const wrapper = ref<HTMLElement | null>()

const getNode = inject<() => Node>("getNode")!;

const table = ref<GenTableColumnView>()

const store = useAssociationEditorGraphStore()

onMounted(() => {
	const node = getNode()
	table.value = node.getData().table

	nextTick(() => {
		if (!wrapper.value) return

		const graph = store._graph()

		graph.disableHistory()

		node.resize(wrapper.value.clientWidth, wrapper.value.clientHeight)

		node.ports.items.forEach(port => {
			node.setPortProp(port.id!, 'attrs', {
				portBody: {
					width: wrapper.value!.clientWidth,
				}
			})
		})

		graph.enableHistory()
	})
});
</script>
