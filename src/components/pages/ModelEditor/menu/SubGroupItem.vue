<script setup lang="ts">
import {Delete, EditPen} from "@element-plus/icons-vue";
import {GenModelInput_TargetOf_subGroups} from "@/api/__generated/model/static";
import {deleteConfirm} from "@/message/confirm.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";

const i18nStore = useI18nStore()

const props = defineProps<{
	subGroup: GenModelInput_TargetOf_subGroups
}>()

const {MODEL_EDITOR, MODEL, SELECT} = useModelEditorStore()

const handleClickLabel = (e: MouseEvent) => {
	const matchedNodeIds = MODEL.tableNodePairs
		.filter(it => it.first.subGroup?.name === props.subGroup.name)
		.map(it => it.second.id)

	if (e.ctrlKey) {
		SELECT.select(matchedNodeIds)
	}
}

const handleEdit = () => {
	MODEL_EDITOR.editSubGroup(props.subGroup.name, props.subGroup)
}

const handleDelete = () => {
	deleteConfirm(`${i18nStore.translate("LABEL_DeleteTarget_SubGroup")}【${props.subGroup.name}】`, () => {
		MODEL_EDITOR.removeSubGroup(props.subGroup.name)
	})
}
</script>

<template>
	<div class="hover-show menu-item">
		<el-text :style="{color: subGroup.style}" @click="handleClickLabel">
			{{ subGroup.name }}
			<Comment :comment="subGroup.comment"/>
		</el-text>

		<span class="hover-show-item" style="padding-left: 0.5em;">
			<el-button :icon="EditPen" link type="warning" @click="handleEdit"/>
			<el-button :icon="Delete" link type="danger" @click="handleDelete"/>
		</span>
	</div>
</template>
