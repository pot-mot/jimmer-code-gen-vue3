<template>
	<div ref="container" style="height: 100%; width: 100%;">
		<div ref="graphBase"/>
	</div>
</template>

<script setup lang="ts">
import {nextTick, onMounted, ref} from "vue";
import { Graph } from "@antv/x6";
import { register } from "@antv/x6-vue-shape";
import TableNode from "./TableNode.vue";
import {useTableEditorStore} from "../../store/tableEditor.ts";
import {GenTableCommonView} from "../../api/__generated/model/static";

const container = ref<HTMLDivElement | null>(null);
const graphBase = ref<HTMLDivElement | null>(null);

let graph: Graph;

register({
	shape: "table",
	component: TableNode,
	label: 'rect',
});

const store = useTableEditorStore()

store.$onAction(({name, after}) => {
	if (name == "addTables") {
		after((result) => {
			removeTableNodes(result.del)
			addTableNodes(result.add)
		})
	}

	if (name == "removeTables") {
		after((result) => {
			removeTableNodes(result)
		})
	}
})

const addTableNodes = (tables: readonly GenTableCommonView[]) => {
	tables.forEach(table => {
		graph.addNode({
			x: 0,
			y: 0,
			shape: "table",
			data: table,
			id: `${table.id}`
		})
		console.log(table)
	})
}

const removeTableNodes = (tables: readonly GenTableCommonView[]) => {
	tables.forEach(table => {
		graph.removeNode(`${table.id}`)

		console.log(table)
	})
}

const graphInit = () => {
	if (!container.value || !graphBase.value) return;
	graph = new Graph({
		container: graphBase.value,
		width: container.value.clientWidth,
		height: container.value.clientHeight
	});
};

onMounted(() => {
	nextTick(() => {
		graphInit();
	})
});
</script>