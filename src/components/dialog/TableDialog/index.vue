<script lang="ts" setup>
import {ref, watch} from 'vue'
import {GenEntityPropertiesView, GenTableAssociationView} from '../../../api/__generated/model/static'
import DragDialog from "../../common/DragDialog.vue"
import TableInfo from "./TableInfo.vue";
import {api} from "../../../api";
import {convertEntities, generateEntities} from "../../AssociationEditor/node/TableNode.ts";
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

const typeState = ref("TableInfo")

watch(() => props.type, () => {
	typeState.value = props.type
}, {immediate: true})

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
		<div class="wrapper">
			<template v-if="table && entity">
				<div class="header">
					<el-text class="title" size="large">{{ table.name }}</el-text>
					<el-tabs v-model="typeState">
						<el-tab-pane name="TableInfo" label="表"></el-tab-pane>
						<el-tab-pane name="EntityInfo" label="实体"></el-tab-pane>
					</el-tabs>
					<el-button class="generate-button" @click="generateEntities([entity.id])">生成实体</el-button>
				</div>

				<div v-if="typeState == 'TableInfo'" class="body">
					<TableInfo :table="table"></TableInfo>
					<TableDefine :id="id"></TableDefine>
				</div>

				<div v-if="typeState == 'EntityInfo'" class="body">
					<EntityInfo :entity="entity"></EntityInfo>
					<PreviewCode :id="entity.id"></PreviewCode>
				</div>
			</template>
			<el-empty class="empty" v-else></el-empty>
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
	height: 4em;
	width: calc(100% - 1em);
	background-color: #fff;
	z-index: 5000;
}

.title {
	height: 2em;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.generate-button {
	position: absolute;
	top: 0;
	right: 1em;
}

.body {
	margin-top: 4em;
}
</style>