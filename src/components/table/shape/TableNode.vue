<template>
	<div class="node" v-if="table">
		<table class="node-wrapper" ref="nodeWrapper">
			<tr>
				<td colspan="3" class="tableName">{{ table.name }}</td>
			</tr>
			<tr v-for="column in table.columns">
				<td>{{ column.name }}</td>
				<td>{{ `${column.type}(${column.displaySize}, ${column.numericPrecision})` }}</td>
				<td>{{ column.comment }}</td>
			</tr>
		</table>
	</div>
</template>

<script setup lang='ts'>
import {inject, nextTick, onMounted, ref} from "vue";
import {GenTableColumnsView} from "../../../api/__generated/model/static";
import {Node} from '@antv/x6'

const nodeWrapper = ref<HTMLElement | null>()

const getNode = inject<() => Node>("getNode")!;

const table = ref<GenTableColumnsView>()

onMounted(() => {
	const node = getNode()
	table.value = node.getData()

	nextTick(() => {
		if (!nodeWrapper.value) return
		node.resize(nodeWrapper.value.clientWidth, nodeWrapper.value.clientHeight)

		table.value?.columns.forEach(column => {
			node.addPort({
				id: `column-${column.id}`,
				group: 'column',
				attrs: {
					portBody: {
						width: nodeWrapper.value!.clientWidth,
					}
				}
			})
		})
	})
});
</script>

<style lang="scss" scoped>
.node {
	.node-wrapper {
		background-color: #fff;
		border: 1px solid #666;
		border-collapse: collapse;

		td {
			white-space: nowrap;
			padding: 0 0.5em;
			height: 30px;
			line-height: 30px;
		}

		.tableName {
			text-align: center;
			border-bottom: 1px solid #999;
		}
	}
}
</style>
