<script lang="ts" setup>
import {Edge} from '@antv/x6'
import {useModelEditorStore} from "../store/ModelEditorStore.ts";
import {computed, ref, watch} from "vue";
import {Delete} from "@element-plus/icons-vue";
import {ModelEditorEventBus} from "../store/ModelEditorEventBus.ts";
import {GenAssociationModelInput} from "@/api/__generated/model/static";
import {sendMessage} from "@/utils/message.ts";
import AssociationIcon from "@/components/global/icons/database/AssociationIcon.vue";

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

const defaultLabel = '无效关联'

const edgeLabel = computed<string | undefined>(() => {
	if (!association.value) {
		return
	}

	try {
		const tempEdgeLabel: string[] = []

		if (association.value.sourceColumn && association.value.sourceColumn.table) {
			tempEdgeLabel.push(association.value.sourceColumn.table.name)
			tempEdgeLabel.push('.')
			tempEdgeLabel.push(association.value.sourceColumn.name)
		} else {
			tempEdgeLabel.push('[无来源] ')
		}

		if (association.value.associationType) {
			tempEdgeLabel.push(" --> ")
		}

		if (association.value.targetColumn && association.value.targetColumn.table) {
			tempEdgeLabel.push(association.value.targetColumn.table.name)
			tempEdgeLabel.push('.')
			tempEdgeLabel.push(association.value.targetColumn.name)
		} else {
			tempEdgeLabel.push(' [无目标]')
		}

		return tempEdgeLabel.join('')
	} catch (e) {
		return
	}
})
</script>

<template>
	<div>
		<el-text class="hover-show">
			<AssociationIcon v-if="association"
							 :association-type="association.associationType"
							 :fake="association.fake"></AssociationIcon>

			<el-button v-if="edgeLabel" link @click="store.focus(edge)">
				{{ edgeLabel }}
			</el-button>
			<el-text v-else type="warning">
				{{ defaultLabel }}
			</el-text>

			<span class="hover-show-item" style="padding-left: 0.5em;">
				<el-button :icon="Delete" link title="删除" type="danger" @click="handleDelete"></el-button>
			</span>
		</el-text>
	</div>
</template>
