<template>
	<div ref="wrapper" style="height: 100%; width: 100%;">
		<div @click="handleUndo">undo</div>
		<div @click="handleRedo">redo</div>
		<div ref="container"/>
	</div>
</template>

<script setup lang="ts">
import {nextTick, onMounted, Ref, ref} from "vue";
import {Graph} from "@antv/x6";

import {ColumnPortLayout} from "./port/ColumnPortLayout.ts";

import {register} from "@antv/x6-vue-shape";
import TableNode from "./shape/TableNode.vue";
import {initGraph} from "./graphEditor/init.ts";
import {useStoreEvents} from "./graphEditor/store.ts";
import {COLUMN_PORT} from "./constant";
import {useHistory} from "./graphEditor/plugins.ts";

const container = ref<HTMLDivElement | null>(null);
const wrapper = ref<HTMLDivElement | null>(null);

const graph: Ref<Graph> = ref();

Graph.registerPortLayout(
	COLUMN_PORT,
	ColumnPortLayout,
	true
)

register({
	shape: "table",
	component: TableNode
});

const handleUndo = () => {
	if (graph.value && graph.value.canUndo()) {
		graph.value.undo()
	}
}

const handleRedo = () => {
	if (graph.value && graph.value.canRedo()) {
		graph.value.redo()
	}
}

onMounted(() => {
	nextTick(() => {
		graph.value = initGraph(container.value!, wrapper.value!)
		useStoreEvents(graph.value)
		useHistory(graph.value)

		console.log(graph.value)
	})
});
</script>