<template>
	<div v-if="table" class="node">
		<table ref="wrapper" class="node-wrapper">
			<tr>
				<td class="tableName" colspan="3">{{ table.name }} {{ table.comment }}</td>
			</tr>
			<tr v-for="column in table.columns">
				<td>{{ column.name }}</td>
				<td>{{ `${column.type}(${column.displaySize}, ${column.numericPrecision})` }}</td>
				<td>{{ column.comment }}</td>
			</tr>
		</table>
	</div>
</template>

<style lang="scss" scoped>
.node {
	.node-wrapper {
		background-color: #fff;
		border: 1px solid #000;
		border-collapse: collapse;

		td {
			white-space: nowrap;
			padding: 0 0.5em;
			height: 30px;
			line-height: 30px;
			font-size: 16px;
		}

		.tableName {
			text-align: center;
			border-bottom: 1px solid var(--common-color);
			font-size: 20px;
			font-weight: 600;
		}
	}
}

.x6-node-selected .node-wrapper {
	outline: 2px solid var(--highlight-color);
	outline-offset: 4px;
}
</style>

<script lang='ts' setup>
import {inject, nextTick, onMounted, ref} from "vue";
import {GenTableColumnsView} from "../../../api/__generated/model/static";
import {Node} from '@antv/x6'
import {useTableEditorGraphStore} from "../../../store/tableEditorGraph.ts";

const wrapper = ref<HTMLElement | null>()

const getNode = inject<() => Node>("getNode")!;

const table = ref<GenTableColumnsView>()

const store = useTableEditorGraphStore()

onMounted(() => {
	const node = getNode()
	table.value = node.getData().table

	nextTick(() => {
		if (!wrapper.value) return

		store.graph().disableHistory()

		node.resize(wrapper.value.clientWidth, wrapper.value.clientHeight)

		node.ports.items.forEach(port => {
			node.setPortProp(port.id!, 'attrs', {
				portBody: {
					width: wrapper.value!.clientWidth,
				}
			})
		})

		store.graph().enableHistory()
	})
});
</script>
