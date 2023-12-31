<script lang="ts" setup>
import {ModelEditorEventBus} from "../store/ModelEditorEventBus.ts";
import {useModelEditorStore} from "../store/ModelEditorStore.ts";
import NodeItem from "./NodeItem.vue";
import EdgeItem from "./EdgeItem.vue";
import Details from "@/components/global/common/Details.vue";
import EnumItem from "@/components/pages/ModelEditor/menu/EnumItem.vue";

const store = useModelEditorStore()
</script>

<template>
	<div>
		<el-button style="margin-bottom: 0.5em;" @click="store.dataSourceLoadMenuOpenState = true">从数据源导入
		</el-button>
		<el-button style="margin-bottom: 0.5em;" @click="store.modelLoadMenuOpenState = true">从模型导入</el-button>

		<Details open>
			<template #title>
				<div style="height: 2em; line-height: 2em;">
					<el-text>Nodes</el-text>
					<el-button style="margin-left: 0.5em;" @click="ModelEditorEventBus.emit('createTable')">创建表</el-button>
				</div>
			</template>

			<div style="padding-bottom: 1em;">
				<NodeItem v-for="node in store.nodes"
						  :node="node"></NodeItem>
			</div>
		</Details>

		<Details open>
			<template #title>
				<div style="height: 2em; line-height: 2em;">
					<el-text>Edges</el-text>
				</div>
			</template>

			<div style="padding-bottom: 1em;">
				<EdgeItem v-for="edge in store.edges"
						  :edge="edge"></EdgeItem>
			</div>
		</Details>

		<Details open>
			<template #title>
				<div style="height: 2em; line-height: 2em;">
					<el-text>Enums</el-text>
					<el-button style="margin-left: 0.5em;" @click="ModelEditorEventBus.emit('createEnum')">创建枚举</el-button>
				</div>
			</template>

			<div style="padding-bottom: 1em;" v-if="store.isModelLoaded">
				<EnumItem v-for="genEnum in store._currentModel().enums"
						  :gen-enum="genEnum"></EnumItem>
			</div>
		</Details>
	</div>
</template>
