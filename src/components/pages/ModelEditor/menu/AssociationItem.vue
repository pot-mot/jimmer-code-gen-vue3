<script lang="ts" setup>
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {computed} from "vue";
import {Delete, EditPen} from "@element-plus/icons-vue";
import {GenAssociationModelInput} from "@/api/__generated/model/static";
import {deleteConfirm} from "@/message/confirm.ts";
import {Edge} from "@antv/x6";
import {UnwrapRefSimple} from "@/declare/UnwrapRefSimple.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import AssociationIcon from "@/components/global/icons/database/AssociationIcon.vue";

const i18nStore = useI18nStore()

const props = defineProps<{
	edge: UnwrapRefSimple<Edge>,
	association: GenAssociationModelInput,
}>()

const {GRAPH, MODEL_EDITOR, VIEW, SELECT} = useModelEditorStore()

const isSelected = computed(() => {
	return GRAPH.selectedEdgeMap.has(props.edge.id)
})

const handleClickAssociation = (e: MouseEvent) => {
	if (e.ctrlKey) {
		SELECT.toggleSelect(props.edge.id)
	} else {
		SELECT.unselectAll()
		VIEW.focus(props.edge.id)
	}
}

const handleDelete = () => {
	deleteConfirm(`${i18nStore.translate('LABEL_DeleteTarget_Association')}【${props.association.name}】`, () => {
		MODEL_EDITOR.removeAssociation(props.edge.id)
	})
}

const getAssociationSourceLabel = (association: GenAssociationModelInput) => {
	const tempEdgeName: string[] = []

	tempEdgeName.push(association.sourceTableName)
	tempEdgeName.push('.')
	tempEdgeName.push(association.columnReferences.map(it => it.sourceColumnName).join(","))

	return tempEdgeName.join('')
}

const getAssociationTargetLabel = (association: GenAssociationModelInput) => {
	const tempEdgeName: string[] = []

	tempEdgeName.push(association.targetTableName)
	tempEdgeName.push('.')
	tempEdgeName.push(association.columnReferences.map(it => it.targetColumnName).join(","))

	return tempEdgeName.join('')
}

const sourceLabel = computed<string | undefined>(() => {
	if (!props.association) return
	try {
		return getAssociationSourceLabel(props.association)
	} catch (e) {
		return
	}
})

const targetLabel = computed<string | undefined>(() => {
	if (!props.association) return
	try {
		return getAssociationTargetLabel(props.association)
	} catch (e) {
		return
	}
})

const handleEdit = (association: GenAssociationModelInput) => {
	MODEL_EDITOR.editAssociation(props.edge.id, association)
}
</script>

<template>
	<div v-if="association && sourceLabel && targetLabel"
		 class="menu-item hover-show" :class="isSelected ? 'selected' : ''">
        <el-text @click="handleClickAssociation">
            <AssociationIcon
                :type="association.type"
                :fake="association.fake"
            />
            {{ association.name }}

			<span>{{ association.fake ? '【fake】' : '' }}</span>
		</el-text>

		<span class="hover-show-item" style="padding-left: 0.5em;">
			<el-button :icon="EditPen" link type="warning" @click="handleEdit(association)"/>
			<el-button :icon="Delete" link type="danger" @click="handleDelete"/>
		</span>
	</div>

	<div v-else>
		<el-text type="warning">{{ edge.id }}</el-text>
	</div>
</template>
