<script setup lang="ts">
import {GenEntityPropertiesView} from "../../../api/__generated/model/static";
import {convertEntities, generateEntities, previewEntities} from "../../AssociationEditor/node/TableNode.ts";
import {ref, watch} from "vue";
import {api} from "../../../api";
import {sendMessage} from "../../../utils/message.ts";
import CodePreview from "../../common/CodePreview.vue";

interface EntityInfoProps {
	id: number
}

const props = defineProps<EntityInfoProps>()

const entity = ref<GenEntityPropertiesView | undefined>()

const previewCodesMap = ref<{
	[key: string]: string
}>({})

const getEntity = async (id: number) => {
	entity.value = await api.entityService.get({id})
	if (!entity.value) {
		sendMessage('entity 获取失败', 'error')
	}
	previewCodesMap.value = await previewEntities([id])
}

watch(() => props.id, async (value) => {
	await getEntity(value)
}, {immediate: true})

const handleConvert = async () => {
	if (entity.value) {
		const newEntityIds = await convertEntities([entity.value.table.id])
		if (newEntityIds.length == 1) {
			await getEntity(newEntityIds[0])
		} else {
			sendMessage('entity 重新转换失败', 'error')
		}
	}
}

const handleGenerate = () => {
	if (entity.value) {
		generateEntities([entity.value.id])
	}
}
</script>

<template>
	<div v-if="entity">
		<el-button @click="handleConvert">重新转换实体</el-button>
		<el-button @click="handleGenerate">生成实体代码</el-button>

		<div>{{ entity.name }}</div>
		<div>{{ entity.comment }}</div>
		<div class="property-line" v-for="property in entity.properties">
			<div>{{ property.name }}</div>
			<div>{{ property.type }}</div>
			<div>{{ property.comment }}</div>
		</div>

		<el-tabs type="border-card">
			<el-tab-pane v-for="name in Object.keys(previewCodesMap)" :label="name">
				<CodePreview :language="name.endsWith('kt') ? 'kt' : 'java' "
							 :code="previewCodesMap[name]"></CodePreview>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<style scoped>
.property-line {
	display: grid;
	grid-template-columns: 10em 10em 1fr;
	height: 2em;
	line-height: 2em;
}
</style>