<script setup lang="ts">
import TopBottomLayout from "../../layout/TopBottomLayout.vue";
import {ModelDialogEventBus} from "../eventBus/ModelDialogEventBus.ts";
import {useModelEditorGraphStore} from "../store/ModelEditorGraphStore.ts";
import NodeList from "../../common/graph/NodeList.vue";
import EdgeList from "../../common/graph/EdgeList.vue";

const store = useModelEditorGraphStore()
</script>

<template>
	<div style="height: 100%; display: grid; grid-template-rows: auto 1fr;">
		<div>
			<el-button @click="ModelDialogEventBus.emit('createTable')">创建表</el-button>
		</div>
		<div>
			<TopBottomLayout>
				<template #top>
					<NodeList :nodes="store.nodes">
						<template #default="{node}">
							<el-button @click="store.focus(node)">
								{{ node }}
							</el-button>
						</template>
					</NodeList>
				</template>
				<template #bottom>
					<EdgeList :edges="store.edges">
						<template #default="{edge}">
							<el-button @click="store.focus(edge)">
								{{ edge }}
							</el-button>
						</template>
					</EdgeList>
				</template>
			</TopBottomLayout>
		</div>
	</div>
</template>

<style scoped>

</style>