<script lang="ts" setup>
import {ModelEditorEventBus} from "../store/ModelEditorEventBus.ts";
import {useModelEditorStore} from "../store/ModelEditorStore.ts";
import NodeItem from "./NodeItem.vue";
import EdgeItem from "./EdgeItem.vue";
import Details from "@/components/global/common/Details.vue";
import EnumItem from "@/components/pages/ModelEditor/menu/EnumItem.vue";
import {computed, ref} from 'vue'

const store = useModelEditorStore()

const EdgeShow_CONSTANTS = ["name", "table", "column"] as const

type EdgeShow = typeof EdgeShow_CONSTANTS[number]

const edgeShowType = ref<EdgeShow>('name')

const toggleEdgeShow = () => {
	const currentIndex = EdgeShow_CONSTANTS.indexOf(edgeShowType.value)
	edgeShowType.value = EdgeShow_CONSTANTS[currentIndex + 1 < EdgeShow_CONSTANTS.length ? currentIndex + 1 : 0]
}

const formattedEdgeShowType = computed(() => {
	switch (edgeShowType.value) {
		case "name":
			return "显示：名称"
		case "table":
			return "显示：连接表"
		case "column":
			return "显示：连接列"
	}
})
</script>

<template>
	<div>
		<el-button style="margin-bottom: 0.5em;" @click="store.dataSourceLoadMenuOpenState = true">从数据源导入
		</el-button>
		<el-button style="margin-bottom: 0.5em;" @click="store.modelLoadMenuOpenState = true">从已持久化的模型导入</el-button>

		<Details open>
			<template #title>
				<div style="height: 2em; line-height: 2em;">
					<el-text>Nodes</el-text>
					<el-button style="margin-left: 0.5em;" @click="ModelEditorEventBus.emit('createTable')">创建表
					</el-button>
				</div>
			</template>

			<div style="padding-bottom: 1em;">
				<NodeItem v-for="node in store.nodes"
						  :key="node.id"
						  :node="node"></NodeItem>
			</div>
		</Details>

		<Details open>
			<template #title>
				<div style="height: 2em; line-height: 2em;">
					<el-text>Edges</el-text>
					<el-button style="margin-left: 0.5em;" @click="toggleEdgeShow">{{ formattedEdgeShowType }}</el-button>
				</div>
			</template>

			<div style="padding-bottom: 1em;">
				<EdgeItem v-for="edge in store.edges"
						  :key="edge.id"
						  :show-name="edgeShowType == 'name'"
						  :show-table="edgeShowType == 'table'"
						  :show-column="edgeShowType == 'column'"
						  :edge="edge"></EdgeItem>
			</div>
		</Details>

		<Details open>
			<template #title>
				<div style="height: 2em; line-height: 2em;">
					<el-text>Enums</el-text>
					<el-button style="margin-left: 0.5em;" @click="ModelEditorEventBus.emit('createEnum')">创建枚举
					</el-button>
				</div>
			</template>

			<div style="padding-bottom: 1em;" v-if="store.isModelLoaded">
				<EnumItem v-for="genEnum in store._currentModel().enums"
						  :key="genEnum.name + genEnum.comment"
						  :gen-enum="genEnum"></EnumItem>
			</div>
		</Details>
	</div>
</template>
