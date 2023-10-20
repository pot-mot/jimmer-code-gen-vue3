<script lang="ts" setup>
import {ref, watch} from 'vue'
import {GenEntityPropertiesView, GenTableAssociationView} from '../../../api/__generated/model/static'
import DragDialog from "../../common/DragDialog.vue"
import TableInfo from "./TableInfo.vue";
import {api} from "../../../api";
import {convertEntities} from "../../AssociationEditor/node/TableNode.ts";
import {sendMessage} from "../../../utils/message.ts";
import TableDefine from "./TableDefine.vue";
import PreviewCode from "./CodePreview.vue";
import EntityInfo from "../../EntityGenerator/entity/EntityInfo.vue";

interface TableDialogProps {
	id: number
	x?: number
	y?: number
	w?: number
	type?: 'TableInfo' | 'EntityInfo'
}

const props = withDefaults(defineProps<TableDialogProps>(), {
	y: 100,
	w: 1000,
	type: 'TableInfo'
})

interface TableDialogEmits {
	(event: "close"): void
}

const emits = defineEmits<TableDialogEmits>()

const table = ref<GenTableAssociationView | undefined>()

const entity = ref<GenEntityPropertiesView | undefined>()

watch(() => props.id, async (id) => {
	table.value = await api.tableService.getAssociationView({id})
	if (table.value) {
		let entityId = table.value.entityId

		if (!entityId) {
			try {
				entityId = (await convertEntities([id]))[0]
				if (!entityId) {
					throw new Error('entity 未成功映射，通过 tableId 映射 entity 返回的 entityId 为 null')
				}
			} catch (e) {
				sendMessage('entity 映射错误', 'error', e)
				return
			}
		}

		try {
			entity.value = await api.entityService.get({id: entityId})
			if (!entity.value) {
				throw new Error('entity 未成功映射，通过 entityId 获取的 entity 为 null')
			}
		} catch (e) {
			sendMessage('entity 映射错误', 'error', e)
			return
		}

	} else {
		sendMessage('table 获取失败，可能不在数据库中', 'error')
	}
}, {immediate: true})
</script>

<template>
	<DragDialog :x="x" :y="y" :init-w="w" @close="emits('close')" :resizable="true">
		<div style="height: 100%; width: 100%; overflow: auto; scrollbar-gutter: stable">
			<template v-if="table && entity">
				<TableInfo :table="table"></TableInfo>
				<TableDefine :id="id"></TableDefine>
				<EntityInfo :entity="entity"></EntityInfo>
				<PreviewCode :id="entity.id"></PreviewCode>
			</template>
			<el-empty style="height: 65vh;" v-else></el-empty>
		</div>
	</DragDialog>
</template>