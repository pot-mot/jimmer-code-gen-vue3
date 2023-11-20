<script lang="ts" setup>
import {Edge} from '@antv/x6'
import {useModelEditorStore} from "../store/ModelEditorStore.ts";
import {ref, watch} from "vue";
import {edgeToModelAssociation} from "../graph/edge/ModelEdge.ts";
import {Delete} from "@element-plus/icons-vue";
import {ModelEditorEventBus} from "../eventBus/ModelEditorEventBus.ts";
import {showAssociationType} from "@/utils/simplifyAssociationType.ts";
import {GenAssociationModelInput} from "@/api/__generated/model/static";

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
			<el-button link @click="store.focus(edge)">
				{{ association.sourceColumn.table.name }}.{{ association.sourceColumn.name }}
				{{ showAssociationType(association.associationType) }} {{
					association.targetColumn.table.name
				}}.{{ association.targetColumn.name }}
			</el-button>

			<span class="hover-show-item" style="padding-left: 0.5em;">
				<el-button :icon="Delete" link title="删除" type="danger" @click="handleDelete"></el-button>
			</span>
		</el-text>
	</div>
	<div v-else>
		<el-text type="warning">无效关联</el-text>
	</div>
</template>