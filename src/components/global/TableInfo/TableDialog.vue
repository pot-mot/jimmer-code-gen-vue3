<script lang="ts" setup>
import {ref, watch} from 'vue'
import {GenTableAssociationsView} from '../../../api/__generated/model/static'
import DragDialog from "../../common/dragDialog/DragDialog.vue"
import TableInfo from "./TableInfo.vue";
import {api} from "../../../api";
import {sendMessage} from "../../../utils/message.ts";
import TableDefine from "./TableDefine.vue";
import TableIcon from "../../icons/database/TableIcon.vue";
import Comment from "../../common/Comment.vue";
import {convertEntities} from "../../AssociationEditor/api.ts";

interface TableEntityDialogProps {
	id: number
	x?: number
	y?: number
	w?: number
}

const props = withDefaults(defineProps<TableEntityDialogProps>(), {
	y: 100,
	w: 1000,
})

interface TableEntityDialogEmits {
	(event: "close"): void
}

const emits = defineEmits<TableEntityDialogEmits>()

const table = ref<GenTableAssociationsView | undefined>()

const entityId = ref<number | undefined>()

watch(() => props.id, async (id) => {
	table.value = (await api.tableService.queryAssociationsView({query: {ids: [id]}}))[0]
	if (table.value) {
		entityId.value = table.value.entityId

		if (!entityId.value) {
			try {
				entityId.value = (await convertEntities([id]))[0]
				if (!entityId.value) {
					sendMessage('entity 未成功映射，通过 tableId 映射 entity 返回的 entityId 为 null, 需要排查后端问题', 'error')
				}
			} catch (e) {
				sendMessage('entity 映射错误', 'error', e)
				return
			}
		}
	} else {
		sendMessage('table 获取失败，可能不在数据库中', 'error')
	}
}, {immediate: true})
</script>

<template>
	<DragDialog :x="x" :y="y" :init-w="w" @close="emits('close')" :can-resize="true">
		<div class="wrapper">
			<template v-if="table">
				<div class="header">
					<span class="icon">
							<TableIcon :type="table.type"></TableIcon>
						</span>
					<span style="padding-left: 0.5em;">{{ table.name }}</span>
					<Comment :comment="table.comment"></Comment>
				</div>

				<div class="body">
					<TableInfo :table="table"></TableInfo>
					<TableDefine :id="id"></TableDefine>
				</div>
			</template>
			<el-empty v-else class="empty"></el-empty>
		</div>
	</DragDialog>
</template>

<style scoped>
.wrapper {
	height: 100%;
	width: 100%;
	overflow: auto;
	scrollbar-gutter: stable
}

.empty {
	height: 65vh;
}

.header {
	position: absolute;
	top: 0;
	margin-top: 1em;
	padding: 0 0.5em;
	height: 2.5em;
	width: calc(100% - 1em);
	background-color: #fff;
	z-index: 5000;
}

.body {
	margin-top: 2.5em;
	padding: 0 1em;
}
</style>