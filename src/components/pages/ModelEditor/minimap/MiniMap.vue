<script lang="ts" setup>
import {nextTick, ref} from "vue";
import {MiniMap} from "@antv/x6-plugin-minimap";
import {ArrowDown, ArrowUp} from "@element-plus/icons-vue";
import {Graph} from "@antv/x6";
import {SimpleNodeView} from "@/components/pages/ModelEditor/minimap/SimpleNodeView.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";

let minimap: MiniMap | undefined

const openState = ref(false)

const container = ref<HTMLElement>()

const props = defineProps<{
	graph: Graph
}>()

const {MODEL_EDITOR} = useModelEditorStore()

const initMiniMap = () => {
	if (!props.graph || !container.value) return
	if (minimap) minimap.dispose()

	minimap = new MiniMap({
		container: container.value,
		width: container.value.clientWidth,
		height: container.value.clientHeight,

		graphOptions: {
            async: true,
			createCellView(cell) {
				if (cell.isEdge()) {
					return null
				}
				if (cell.isNode()) {
					return SimpleNodeView
				}
			},
		}
	})

	props.graph.use(minimap)
}

MODEL_EDITOR.setInitMinimapAction(initMiniMap)

const open = async () => {
	openState.value = true
	await nextTick()
	initMiniMap()
}

const close = () => {
	openState.value = false
	minimap?.dispose()
	minimap = undefined
}

const toggle = async () => {
	if (openState.value) {
		close()
	} else {
		await open()
	}
}
</script>

<template>
	<div class="wrapper">
		<div style="text-align: center">
			<el-button :icon="!openState ? ArrowUp : ArrowDown" size="small" @click="toggle"/>
		</div>
		<div v-if="openState" ref="container" class="minimap"/>
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

:deep(.x6-widget-minimap) {
	background-color: var(--background-color) !important;
}
</style>
