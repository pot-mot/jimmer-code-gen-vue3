<script setup lang="ts">
import {Edge} from '@antv/x6'
import {useModelEditorStore} from "../store/ModelEditorStore.ts";
import {ref, watch} from "vue";
import {edgeToModelAssociation} from "../edge/ModelEdge.ts";
import {Delete} from "@element-plus/icons-vue";
import {ModelEditorEventBus} from "../eventBus/ModelEditorEventBus.ts";
import {showAssociationType} from "../../../utils/simplifyAssociationType.ts";
import {GenAssociationModelInput} from "../../../api/__generated/model/static";

interface EdgeItem {
	edge: Edge
}

const props = defineProps<EdgeItem>()

const store = useModelEditorStore()

const association = ref<GenAssociationModelInput>()

watch(() => props.edge, (edge) => {
	association.value = edgeToModelAssociation(edge)
	if (association.value) {
		edge.setData({association: association.value})
	}

	edge.on('change:*', () => {
		association.value = edgeToModelAssociation(edge)
		if (association.value) {
			edge.setData({association: association.value})
		}
	})
}, {immediate: true})

const handleDelete = () => {
	ModelEditorEventBus.emit('removeAssociation', props.edge.id)
}
</script>

<template>
	<div v-if="association">
		<el-text class="hover-show">
			<el-button @click="store.focus(edge)" link>
				{{ association.sourceColumn.table.name }}.{{ association.sourceColumn.name }} {{ showAssociationType(association.associationType) }} {{ association.targetColumn.table.name }}.{{ association.targetColumn.name }}
			</el-button>

			<span style="padding-left: 0.5em;" class="hover-show-item">
				<el-button @click="handleDelete" title="删除" :icon="Delete" type="danger" link></el-button>
			</span>
		</el-text>
	</div>
	<div v-else>
		<el-text type="warning">无效关联</el-text>
	</div>
</template>