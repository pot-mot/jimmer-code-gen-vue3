<script setup lang="ts">
import {Delete, EditPen} from "@element-plus/icons-vue";
import {GenModelInput_TargetOf_enums} from "@/api/__generated/model/static";
import {deleteConfirm} from "@/message/confirm.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import {computed} from "vue";
import {useEnumDialogsStore} from "@/store/modelEditor/dialogs/EnumDialogsStore.ts";
import {useModelEditorContextMenuStore} from "@/store/modelEditor/contextMenu/ModelEditorContextMenuStore.ts";

const i18nStore = useI18nStore()

const props = defineProps<{
	genEnum: GenModelInput_TargetOf_enums
}>()

const enumDialogs = useEnumDialogsStore()

const {MODEL, SELECT} = useModelEditorStore()

const isSelected = computed(() => {
	return MODEL.selectedEnumMap.has(props.genEnum.name)
})

const handleClickLabel = (e: MouseEvent) => {
	if (e.ctrlKey) {
		SELECT.toggleSelectEnum(props.genEnum.name)
	} else {
		SELECT.unselectAll()
		SELECT.selectEnum(props.genEnum.name)
	}
}

const handleEdit = () => {
	enumDialogs.edit(props.genEnum.name, props.genEnum)
}

const handleDelete = () => {
	deleteConfirm(`${i18nStore.translate("LABEL_DeleteTarget_Enum")}【${props.genEnum.name}】`, () => {
		enumDialogs.remove(props.genEnum.name)
	})
}

const handleContextMenu = (e: MouseEvent) => {
	if (props.genEnum) {
		e.preventDefault()
		e.stopPropagation()
		useModelEditorContextMenuStore().open(
			{x: e.pageX, y: e.pageY},
			{type: 'Enum', enum: props.genEnum}
		)
	}
}
</script>

<template>
	<div class="menu-item hover-show" :class="isSelected ? 'selected' : ''" @contextmenu="handleContextMenu">
		<el-text @click="handleClickLabel">
			{{ genEnum.name }}
			<Comment :comment="genEnum.comment"/>
		</el-text>

		<span class="hover-show-item" style="padding-left: 0.5em;">
			<el-button :icon="EditPen" link type="warning" @click="handleEdit"/>
			<el-button :icon="Delete" link type="danger" @click="handleDelete"/>
		</span>
	</div>
</template>
