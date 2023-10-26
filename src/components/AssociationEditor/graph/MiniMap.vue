<script setup lang="ts">
import {nextTick, ref} from "vue";
import {MiniMap} from "@antv/x6-plugin-minimap";
import {useAssociationEditorGraphStore} from "../store/AssociationEditorGraphStore.ts";

const store = useAssociationEditorGraphStore()

const openState = ref(false)

const minimap = ref<MiniMap | undefined>()

const container = ref<HTMLElement>()

const setMiniMap = async () => {
	await nextTick()

	const graph = store._graph()

	if (!graph || !container.value) return

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
			},
		}
	})

	graph.use(
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
	minimap.value?.dispose()
	openState.value = false
}

defineExpose({
	openState,
	open,
	close,
	toggle: () => {
		if (openState.value) {
			close()
		} else {
			open()
		}
	}
})
</script>

<template>
	<div v-if="openState" ref="container" class="minimap"></div>
</template>

<style scoped>
.minimap {
	width: max(15vw, 200px);
	height: max(20vh, 200px);
}
</style>