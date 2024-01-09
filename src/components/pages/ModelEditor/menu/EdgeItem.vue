<script lang="ts" setup>
import {Edge} from '@antv/x6'
import {useModelEditorStore} from "../store/ModelEditorStore.ts";
import {computed, ref, watch} from "vue";
import {Delete, EditPen} from "@element-plus/icons-vue";
import {ModelEditorEventBus} from "../store/ModelEditorEventBus.ts";
import {GenAssociationModelInput} from "@/api/__generated/model/static";
import {sendMessage} from "@/utils/message.ts";
import AssociationIcon from "@/components/global/icons/database/AssociationIcon.vue";
import {
	getAssociationSourceLabel,
	getAssociationTargetLabel
} from "@/components/business/modelGraphEditor/associationEdge/associationName.ts";
import AssociationForm from "@/components/business/association/AssociationForm.vue";

interface EdgeItem {
	edge: Edge,
	showName: boolean,
	showTable: boolean,
	showColumn: boolean,
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

const handleClickLabel = (e: MouseEvent) => {
	if (e.ctrlKey) {
		store.select(props.edge.id)
	} else {
		store.focus(props.edge.id)
	}
}

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

const editDialogOpenState = ref(false)

const handleEdit = () => {
	editDialogOpenState.value = true
}

const isSelected = computed(() => {
	return store.selectedEdgeMap.has(props.edge.id)
})
</script>

<style scoped>
.selected {
	background-color: rgba(220, 220, 220, 0.3);
}
</style>

<template>
	<div v-if="association && sourceLabel && targetLabel"
		 class="hover-show" :class="isSelected ? 'selected' : ''">

		<el-text style="white-space: nowrap;">
			<template v-if="showName">
				<el-button link @click="handleClickLabel">
					{{ association.name }}
					<span>{{ association.fake ? '【logical】' : '' }}</span>
				</el-button>
			</template>

			<template v-if="showColumn || showTable">
				<el-button link @click="store.focus(edge.getSourceCellId())">
					{{ showColumn ? sourceLabel : association.sourceTable.name }}
				</el-button>
				<span>
					<AssociationIcon :association-type="association.associationType"
									 :fake="association.fake"
									 style="transform: translateY(0.3em)"></AssociationIcon>
				</span>
				<el-button link @click="store.focus(edge.getTargetCellId())">
					{{ showColumn ? targetLabel : association.targetTable.name}}
				</el-button>
			</template>
		</el-text>

		<span class="hover-show-item" style="padding-left: 0.5em;">
			<el-button :icon="EditPen" link title="编辑" type="warning" @click="handleEdit"></el-button>
			<el-button :icon="Delete" link title="删除" type="danger" @click="handleDelete"></el-button>
		</span>
	</div>

	<div v-else>
		<el-text type="warning">
			{{ defaultLabel }}
		</el-text>
	</div>

	<el-dialog v-if="association" v-model="editDialogOpenState">
		<AssociationForm
			:association="association"
			@submit="(newAssociation) => {
				edge.setData({association: newAssociation}, {overwrite: true})
				editDialogOpenState = false
			}"
			@cancel="editDialogOpenState = false"
		></AssociationForm>
	</el-dialog>
</template>
