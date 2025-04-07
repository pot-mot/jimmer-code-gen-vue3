<script lang="ts" setup>
import {AssociationEdgePair, useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {computed} from "vue";
import {Delete, EditPen} from "@element-plus/icons-vue";
import {GenAssociationModelInput} from "@/api/__generated/model/static";
import {deleteConfirm} from "@/message/confirm.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import AssociationIcon from "@/components/global/icons/database/AssociationIcon.vue";
import {useAssociationsStore} from "@/store/modelEditor/dialogs/AssociationsStore.ts";
import AssociationDialogs from "@/components/pages/ModelEditor/dialogs/association/AssociationDialogs.vue";
import {useEventTargetStore} from "@/store/modelEditor/eventTarget/EventTargetStore.ts";

const i18nStore = useI18nStore()

const props = defineProps<AssociationEdgePair>()

const associationDialogs = useAssociationsStore()

const {GRAPH, VIEW, SELECT} = useModelEditorStore()

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
		associationDialogs.remove(props.edge.id)
	})
}

const handleEdit = (association: GenAssociationModelInput) => {
	AssociationDialogs.edit(props.edge.id, association)
}

const handleMouseEnter = () => {
	useEventTargetStore().target = {type: 'Association', associationEdgePair: props}
}
</script>

<template>
	<div
		class="menu-item hover-show"
		:class="isSelected ? 'selected' : ''"
		@mouseenter="handleMouseEnter"
	>
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
</template>
