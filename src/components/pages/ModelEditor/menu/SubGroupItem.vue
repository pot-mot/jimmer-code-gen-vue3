<script setup lang="ts">
import {Delete, EditPen} from "@element-plus/icons-vue";
import {GenModelInput_TargetOf_subGroups} from "@/api/__generated/model/static";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import {computed, nextTick} from "vue";
import {getNodeConnectedEdges} from "@/components/global/graphEditor/selection/selectOperation.ts";
import {useSubGroupsStore} from "@/store/modelEditor/dialogs/SubGroupsStore.ts";
import {useEventTargetStore} from "@/store/modelEditor/eventTarget/EventTargetStore.ts";

const i18nStore = useI18nStore()

const props = defineProps<{
	subGroup: GenModelInput_TargetOf_subGroups | undefined
}>()

const subGroupDialogs = useSubGroupsStore()

const {MODEL, SELECT, GRAPH} = useModelEditorStore()

const isSelected = computed(() => {
	return MODEL.selectedSubGroupMap.has(props.subGroup?.name)
})

const handleClickLabel = async (e: MouseEvent) => {
	const matchedNodeIds = MODEL.tableNodePairs
		.filter(it => it.table.subGroup?.name === props.subGroup?.name)
		.map(it => it.node.id)

	const matchedEnumNames = MODEL.enums
		.filter(it => it.subGroup?.name === props.subGroup?.name)
		.map(it => it.name)

	const connectedEdgeIds = getNodeConnectedEdges(GRAPH._graph(), matchedNodeIds)
		.map(it => it.id)

	if (e.ctrlKey) {
		SELECT.toggleSelectSubGroup(props.subGroup?.name)
		await nextTick()
		if (isSelected.value) {
			SELECT.select([...matchedNodeIds, ...connectedEdgeIds])
			SELECT.selectEnum(...matchedEnumNames)
		} else {
			SELECT.unselect([...matchedNodeIds, ...connectedEdgeIds])
			SELECT.unselectEnum(...matchedEnumNames)
		}
	} else {
		SELECT.unselectAll()
		SELECT.selectSubGroup(props.subGroup?.name)
		SELECT.select([...matchedNodeIds, ...connectedEdgeIds])
		SELECT.selectEnum(...matchedEnumNames)
	}
    useEventTargetStore().target = {type: 'SubGroup', subGroup: props.subGroup}
}

const handleEdit = () => {
	if (props.subGroup) {
		subGroupDialogs.edit(props.subGroup.name, props.subGroup)
	}
}

const handleDelete = () => {
	if (props.subGroup) {
		const subGroup = props.subGroup
        subGroupDialogs.remove(subGroup.name)
	}
}
</script>

<template>
	<div
		class="hover-show menu-item"
		:class="isSelected ? 'selected' : ''"
	>
		<template v-if="subGroup">
			<el-text :style="{color: subGroup.style}" @click="handleClickLabel">
				{{ subGroup.name }}
				<Comment :comment="subGroup.comment"/>
			</el-text>

			<span class="hover-show-item" style="padding-left: 0.5em;">
                <el-button :icon="EditPen" link type="warning" @click="handleEdit"/>
                <el-button :icon="Delete" link type="danger" @click="handleDelete"/>
            </span>
		</template>
		<template v-else>
			<el-text @click="handleClickLabel">
				[{{ i18nStore.translate("LABEL_SubGroupItem_noSubGroup") }}]
			</el-text>
		</template>
	</div>
</template>
