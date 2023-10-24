<script setup lang="ts">
import {GenEntityPropertiesView} from "../../../api/__generated/model/static";
import {convertEntities, generateEntities} from "../../AssociationEditor/node/TableNode.ts";
import {ref, watch} from "vue";
import {api} from "../../../api";
import {sendMessage} from "../../../utils/message.ts";

interface EntityInfoProps {
	id: number
}

const props = defineProps<EntityInfoProps>()

const entity = ref<GenEntityPropertiesView | undefined>()

const getEntity = async (id: number) => {
	entity.value = await api.entityService.get({id})
	if (!entity.value) {
		sendMessage('entity 获取失败', 'error')
	}
}

watch(() => props.id, async (value) => {
	await getEntity(value)
}, {immediate: true})

const handleConvert = async () => {
	if (entity.value) {
		const newEntityIds = await convertEntities([entity.value.tableId])
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
		<table v-for="property in entity.properties">
			<tr>
				<td>{{ property.name }}</td>
				<td>{{ property.type }}</td>
				<td>{{ property.id }}</td>
				<td>{{ property.comment }}</td>
			</tr>
		</table>
	</div>
</template>

<style scoped>

</style>