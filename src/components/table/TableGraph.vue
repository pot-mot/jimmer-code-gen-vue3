<template>
	<div ref="container" style="height: 100%; width: 100%;">
		<div ref="graphBase"/>
	</div>
</template>

<script setup lang="ts">
import {nextTick, onMounted, ref} from "vue";
import {Graph} from "@antv/x6";

import {ColumnPortLayout} from "./port/ColumnPortLayout.ts";

import {useTableEditorStore} from "../../store/tableEditor.ts";
import {GenTableCommonView} from "../../api/__generated/model/static";
import {addTableNodes} from "./common/table.ts";
import {register} from "@antv/x6-vue-shape";
import TableNode from "./shape/TableNode.vue";
import {AssociationEdge} from "./edge/AssociationEdge.ts";

const container = ref<HTMLDivElement | null>(null);
const graphBase = ref<HTMLDivElement | null>(null);

let graph: Graph;

const store = useTableEditorStore()

Graph.registerPortLayout(
	"Column",
	ColumnPortLayout,
	true
)

register({
	shape: "table",
	component: TableNode
});

store.$onAction(({name, after}) => {
	if (name == "addTables") {
		after((result) => {
			removeTableNodes(result.del)
			addTableNodes(graph, result.add)
		})
	}

	if (name == "removeTables") {
		after((result) => {
			removeTableNodes(result)
		})
	}
})

const removeTableNodes = (tables: readonly GenTableCommonView[]) => {
	tables.forEach(table => {
		graph.removeNode(`table-${table.id}`)
	})
}

const graphInit = () => {
	if (!container.value || !graphBase.value) return;
	graph = new Graph({
		container: graphBase.value,
		width: container.value.clientWidth,
		height: container.value.clientHeight,
		connecting: AssociationEdge
	});
	graphBase.value.addEventListener('resize', () => {
		if (container.value) graph.resize(container.value.clientWidth, container.value.clientHeight)
	})
};

onMounted(() => {
	nextTick(() => {
		graphInit();
	})
});
</script>