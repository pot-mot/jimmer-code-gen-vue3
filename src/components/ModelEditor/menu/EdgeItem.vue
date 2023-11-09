<script setup lang="ts">
import {Edge} from '@antv/x6'
import {useModelEditorStore} from "../store/ModelEditorStore.ts";
import {ref, watch} from "vue";
import {EdgeData, mapEdgeToData} from "../edge/ModelEdge.ts";
import {Delete} from "@element-plus/icons-vue";
import {ModelEditorEventBus} from "../eventBus/ModelEditorEventBus.ts";
import {showAssociationType} from "../../../utils/simplifyAssociationType.ts";

interface EdgeItem {
	edge: Edge
}

const props = defineProps<EdgeItem>()

const store = useModelEditorStore()

const data = ref<EdgeData>()

watch(() => props.edge, (edge) => {
	data.value = mapEdgeToData(edge)

	edge.on('change:*', () => {
		data.value = mapEdgeToData(edge)
	})
}, {immediate: true})

const handleDelete = () => {
	ModelEditorEventBus.emit('removeAssociation', props.edge.id)
}
</script>

<template>
	<div v-if="data">
		<el-text class="hover-show">
			<el-button @click="store.focus(edge)" link>
				{{ data.sourceTableName }}.{{ data.sourceColumnName }} {{ showAssociationType(data.associationType) }} {{ data.targetTableName }}.{{ data.targetColumnName }}
			</el-button>

			<span style="padding-left: 0.5em;" class="hover-show-item">
				<el-button @click="handleDelete" title="删除" :icon="Delete" type="danger" link></el-button>
			</span>
		</el-text>
	</div>
</template>

<style scoped>

</style>