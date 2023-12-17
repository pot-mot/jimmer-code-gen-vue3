<script lang="ts" setup>
import {Edge} from '@antv/x6'
import {useModelEditorStore} from "../store/ModelEditorStore.ts";
import {ref, watch} from "vue";
import {Delete} from "@element-plus/icons-vue";
import {ModelEditorEventBus} from "../store/ModelEditorEventBus.ts";
import {showAssociationType} from "@/utils/simplifyAssociationType.ts";
import {GenAssociationModelInput} from "@/api/__generated/model/static";
import {sendMessage} from "@/utils/message.ts";

interface EdgeItem {
	edge: Edge
}

const props = defineProps<EdgeItem>()

const store = useModelEditorStore()

const association = ref<GenAssociationModelInput>()

watch(() => props.edge, (edge) => {
	try {
		association.value = edge.getData()?.association

		edge.on('change:data', () => {
			association.value = edge.getData()?.association
		})
	} catch (e) {
		sendMessage('从 Edge 获取 Association 失败', 'error', e)
	}
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
				{{ showAssociationType(association.associationType) }}
				{{ association.targetColumn.table.name }}.{{ association.targetColumn.name }}
			</el-button>

			<span class="hover-show-item" style="padding-left: 0.5em;">
				<el-button :icon="Delete" link title="删除" type="danger" @click="handleDelete"></el-button>
			</span>
		</el-text>
	</div>
	<div v-else>
		<el-text type="warning">
			无效关联 {{ edge.id }}
		</el-text>
	</div>
</template>
