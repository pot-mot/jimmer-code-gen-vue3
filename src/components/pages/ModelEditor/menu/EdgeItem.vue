<script lang="ts" setup>
import {Edge} from '@antv/x6'
import {useModelEditorStore} from "../store/ModelEditorStore.ts";
import {computed, ref, watch} from "vue";
import {Delete} from "@element-plus/icons-vue";
import {ModelEditorEventBus} from "../store/ModelEditorEventBus.ts";
import {GenAssociationModelInput} from "@/api/__generated/model/static";
import {sendMessage} from "@/utils/message.ts";
import AssociationIcon from "@/components/global/icons/database/AssociationIcon.vue";
import {getAssociationSourceLabel, getAssociationTargetLabel} from "@/components/business/modelGraphEditor/associationEdge/associationName.ts";

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

const sourceLabel = computed<string | undefined>(() => {
	if (!association.value) return
	try {
		return getAssociationSourceLabel(association.value)
	} catch (e) {
		return
	}
})

const targetLabel = computed<string | undefined>(() => {
	if (!association.value) return
	try {
		return getAssociationTargetLabel(association.value)
	} catch (e) {
		return
	}
})
</script>

<template>
	<div>
		<el-text class="hover-show">
			<el-button v-if="association && sourceLabel && targetLabel" link @click="store.focus(edge)">
				<span>
					{{ sourceLabel }}
				</span>
				<span style="padding: 0 0.3em;">
					<AssociationIcon :association-type="association.associationType"
									 :fake="association.fake"></AssociationIcon>
				</span>
				<span>
					{{ targetLabel }}
				</span>
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
