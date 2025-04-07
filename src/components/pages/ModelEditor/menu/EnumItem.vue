<script setup lang="ts">
import {Delete, EditPen} from "@element-plus/icons-vue";
import {GenModelInput_TargetOf_enums} from "@/api/__generated/model/static";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {computed} from "vue";
import {useEnumsStore} from "@/store/modelEditor/dialogs/EnumsStore.ts";
import {useEventTargetStore} from "@/store/modelEditor/eventTarget/EventTargetStore.ts";

const props = defineProps<{
	genEnum: GenModelInput_TargetOf_enums
}>()

const enumDialogs = useEnumsStore()

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
    useEventTargetStore().target = {type: 'Enum', enum: props.genEnum}
}

const handleEdit = () => {
	enumDialogs.edit(props.genEnum.name, props.genEnum)
}

const handleDelete = () => {
    enumDialogs.remove(props.genEnum.name)
}
</script>

<template>
	<div
		class="menu-item hover-show"
		:class="isSelected ? 'selected' : ''"
	>
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
