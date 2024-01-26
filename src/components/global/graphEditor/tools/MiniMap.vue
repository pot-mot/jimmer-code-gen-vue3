<script lang="ts" setup>
import {nextTick, ref} from "vue";
import {MiniMap} from "@antv/x6-plugin-minimap";
import {ArrowDown, ArrowUp} from "@element-plus/icons-vue";
import {Graph, Node} from "@antv/x6";
import {SimpleNodeView} from "@/components/pages/ModelEditor/graph/tableNode/simpleNode.ts";

const openState = ref(false)

const minimap = ref<MiniMap | undefined>()

const container = ref<HTMLElement>()

interface MiniMapProps {
	graph: Graph
}

const props = defineProps<MiniMapProps>()

const setMiniMap = async () => {
	await nextTick()

	if (!props.graph || !container.value) return

	minimap.value = new MiniMap({
		container: container.value,
		width: container.value.clientWidth,
		height: container.value.clientHeight,

		graphOptions: {
			async: true,
			createCellView(cell) {
				// 在小地图中不渲染边
				if (cell.isEdge()) {
					return null
				}
				if (cell.isNode()) {
					return SimpleNodeView
				}
			},
		}
	})

	props.graph.use(
		minimap.value
	);
}

const open = () => {
	openState.value = true
	nextTick(() => {
		setMiniMap()
	})
}

const close = () => {
	openState.value = false
}

const toggle = () => {
	if (openState.value) {
		close()
	} else {
		open()
	}
}
</script>

<template>
	<div class="wrapper">
		<div style="text-align: center">
			<el-button :icon="!openState ? ArrowUp : ArrowDown" size="small" @click="toggle"></el-button>
		</div>
		<div v-if="openState" ref="container" class="minimap"></div>
	</div>
</template>

<style scoped>
.wrapper {
	width: max(15vw, 200px);
}

.minimap {
	width: max(15vw, 200px);
	height: max(20vh, 200px);
}
</style>
