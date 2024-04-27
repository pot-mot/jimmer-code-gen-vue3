<script lang="ts" setup>
import {Edge} from '@antv/x6'
import {useModelEditorStore} from "../store/ModelEditorStore.ts";
import {computed, ref, watch} from "vue";
import {Delete, EditPen} from "@element-plus/icons-vue";
import {ModelEditorEventBus} from "../store/ModelEditorEventBus.ts";
import {GenAssociationModelInput} from "@/api/__generated/model/static";
import {sendMessage} from "@/message/message.ts";
import AssociationIcon from "@/components/global/icons/database/AssociationIcon.vue";
import {deleteConfirm} from "@/message/confirm.ts";

interface EdgeItem {
	edge: Edge,
	showName: boolean,
	showTable: boolean,
	showColumn: boolean,
}

const props = defineProps<EdgeItem>()

const {GRAPH, VIEW, SELECT} = useModelEditorStore()

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

const handleClickName = (e: MouseEvent) => {
	if (e.ctrlKey) {
		SELECT.select(props.edge.id)
	} else {
		VIEW.focus(props.edge.id)
	}
}

const handleDelete = () => {
	deleteConfirm(`关联【${association.value?.name}】`, () => {
		ModelEditorEventBus.emit('removeAssociation', props.edge.id)
	})
}

const getAssociationSourceLabel = (association: GenAssociationModelInput) => {
	const tempEdgeName: string[] = []

	tempEdgeName.push(association.sourceTableName)
	tempEdgeName.push(' . ')
	tempEdgeName.push(association.columnReferences.map(it => it.sourceColumnName).join(","))

	return tempEdgeName.join('')
}

const getAssociationTargetLabel = (association: GenAssociationModelInput) => {
	const tempEdgeName: string[] = []

	tempEdgeName.push(association.targetTableName)
	tempEdgeName.push(' . ')
	tempEdgeName.push(association.columnReferences.map(it => it.targetColumnName).join(","))

	return tempEdgeName.join('')
}

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

const handleEdit = (association: GenAssociationModelInput) => {
	ModelEditorEventBus.emit('editAssociation', {id: props.edge.id, association})
}

const isSelected = computed(() => {
	return GRAPH.selectedEdgeMap.has(props.edge.id)
})
</script>

<template>
	<div v-if="association && sourceLabel && targetLabel"
		 class="hover-show" :class="isSelected ? 'selected-menu-item' : ''">

		<el-text style="white-space: nowrap;">
			<template v-if="showName">
				<el-button link @click="handleClickName">
					<template v-if="association.name">
						{{ association.name }}
					</template>
					<template v-else>
						{{ "暂无名称" }}
					</template>
					<span>{{ association.fake ? '【fake】' : '' }}</span>
				</el-button>
			</template>

			<template v-if="showColumn || showTable">
				<el-button link @click="VIEW.focus(edge.getSourceCellId())">
					{{ showColumn ? sourceLabel : association.sourceTableName }}
				</el-button>
				<span>
					<AssociationIcon :type="association.type"
									 :fake="association.fake"
									 style="transform: translateY(0.3em)"></AssociationIcon>
				</span>
				<el-button link @click="VIEW.focus(edge.getTargetCellId())">
					{{ showColumn ? targetLabel : association.targetTableName }}
				</el-button>
			</template>
		</el-text>

		<span class="hover-show-item" style="padding-left: 0.5em;">
			<el-button :icon="EditPen" link type="warning" @click="handleEdit(association)"></el-button>
			<el-button :icon="Delete" link type="danger" @click="handleDelete"></el-button>
		</span>
	</div>

	<div v-else>
		<el-text type="warning">
			{{ edge.id }}
		</el-text>
	</div>
</template>
