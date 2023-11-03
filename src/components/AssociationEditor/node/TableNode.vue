<template>
	<div class="node">
		<table v-if="table"  ref="wrapper" class="table-wrapper"
			   @dblclick="TableEntityDialogEventBus.emit('addTableEntityDialog', table.id)">
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
	</div>
</template>

<style lang="scss" scoped>
.node {
	padding-bottom: 10px;
	font-family: var(--el-font-family);
	color: var(--el-color-info-dark-2);

	.table-wrapper {
		background-color: #fff;
		border: 1px solid var(--el-color-info);
		border-collapse: collapse;

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

.table-wrapper.hovered {
	border-color: var(--el-color-black);
}

.table-wrapper.selected {
	outline: 2px solid var(--highlight-color);
	outline-offset: 2px;
}
</style>

<script lang='ts' setup>
import {inject, nextTick, onMounted, ref} from "vue";
import {GenTableColumnsView} from "../../../api/__generated/model/static";
import {Node} from '@antv/x6'
import {useAssociationEditorGraphStore} from "../store/AssociationEditorGraphStore.ts";
import ColumnIcon from "../../icons/database/ColumnIcon.vue";
import TableIcon from "../../icons/database/TableIcon.vue";
import Comment from "../../common/Comment.vue";
import {TableEntityDialogEventBus} from "../eventBus/TableEntityDialogEventBus.ts";

const wrapper = ref<HTMLElement | null>()

const getNode = inject<() => Node>("getNode")!;

const table = ref<GenTableColumnsView>()

const store = useAssociationEditorGraphStore()

onMounted(async () => {
	const node = getNode()

	// 绑定数据
	table.value = node.getData().table

	node.on('change:data', () => {
		table.value = node.getData().table
	})

	await nextTick()

	if (!wrapper.value) return

	// 响应式更新尺寸
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

	// 添加 column port
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
});
</script>
