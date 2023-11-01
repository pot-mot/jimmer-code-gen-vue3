<script setup lang="ts">
import {onMounted, ref} from "vue";
import {api} from "../../../api";
import {GenTypeMapping} from "../../../api/__generated/model/entities";
import {useLoading} from "../../../hooks/useLoading.ts";
import {Check, Close, Delete, EditPen} from "@element-plus/icons-vue";
import {deleteConfirm} from "../../../utils/message.ts";
import {GenTypeMappingInput} from "../../../api/__generated/model/static";

interface EditState {
	isEdit: Boolean
}

const typeMappings = ref<(GenTypeMapping & EditState)[]>([])

const typeMappingLoading = useLoading()

const getData = async () => {
	typeMappingLoading.start()
	typeMappings.value = (await api.typeMappingService.list()).map(it => {
		return {
			...it,
			isEdit: false
		}
	})
	typeMappingLoading.end()
}

onMounted(() => {
	getData()
})

const addState = ref(false)

const defaultTypeMapping: GenTypeMappingInput = {
	typeExpression: "",
	regex: false,
	propertyType: "java.lang.String",
	remark: "",
}


const newTypeMapping = ref<GenTypeMappingInput>({
	...defaultTypeMapping
})

const handleAdd = async () => {
	await api.typeMappingService.create({body: newTypeMapping.value})
	addState.value = false
	await getData()
}

const handleAddCancel = () => {
	newTypeMapping.value = {...defaultTypeMapping}
	addState.value = false
}

const handleEdit = async (typeMapping: GenTypeMapping) => {
	await api.typeMappingService.update({body: typeMapping})
	await getData()
}

const handleEditCancel = async (id: number) => {
	const oldData = await api.typeMappingService.get({id})
	if (!oldData) return

	for (let i = 0; i < typeMappings.value.length; i++) {
		if (typeMappings.value[i].id == id) {
			typeMappings.value[i] = {
				...oldData,
				isEdit: false
			}
			break
		}
	}
}

const handleDelete = (typeMapping: GenTypeMapping) => {
	deleteConfirm(`该类型映射`, async () => {
		await api.typeMappingService.delete({ids: [typeMapping.id]})
		await getData()
	})
}
</script>

<template>
	<div>
		<h3 style="width: 100%; text-align: center; height: 2em; line-height: 2em;">类型映射配置</h3>

		<div class="type-mapping-line">
			<el-text>
				数据库类型匹配表达式
			</el-text>
			<el-text>
				是否正则
			</el-text>
			<el-text>
				映射类型
			</el-text>
			<el-text>
				备注
			</el-text>
			<el-text>
				操作
			</el-text>
		</div>

		<div class="type-mapping-line" v-for="typeMapping in typeMappings">
			<template v-if="!typeMapping.isEdit">
				<el-text>
					{{ typeMapping.typeExpression }}
				</el-text>
				<el-text>
					{{ typeMapping.regex }}
				</el-text>
				<el-text>
					{{ typeMapping.propertyType }}
				</el-text>
				<el-text>
					{{ typeMapping.remark }}
				</el-text>
				<el-text>
					<el-button @click="typeMapping.isEdit = true" title="编辑" :icon="EditPen" type="warning"
							   link></el-button>
					<el-button @click="handleDelete(typeMapping)" title="删除" :icon="Delete" type="danger"
							   link></el-button>
				</el-text>
			</template>
			<template v-else>
				<div>
					<el-input v-model="typeMapping.typeExpression"></el-input>
				</div>
				<div>
					<el-switch v-model="typeMapping.regex"></el-switch>
				</div>
				<div>
					<el-input v-model="typeMapping.propertyType"></el-input>
				</div>
				<div>
					<el-input v-model="typeMapping.remark"></el-input>
				</div>
				<div>
					<el-button @click="handleEditCancel(typeMapping.id)" title="取消" :icon="Close" type="info"
							   link></el-button>
					<el-button @click="handleEdit(typeMapping)" title="保存" :icon="Check" type="warning"
							   link></el-button>
				</div>
			</template>
		</div>

		<div class="type-mapping-line">
			<div v-if="!addState">
				<el-button @click="addState = true">新增</el-button>
			</div>
			<template v-else>
				<div>
					<el-input v-model="newTypeMapping.typeExpression"></el-input>
				</div>
				<div>
					<el-switch v-model="newTypeMapping.regex"></el-switch>
				</div>
				<div>
					<el-input v-model="newTypeMapping.propertyType"></el-input>
				</div>
				<div>
					<el-input v-model="newTypeMapping.remark"></el-input>
				</div>
				<div>
					<el-button @click="handleAdd" title="保存" :icon="Check" type="success"
							   link></el-button>
					<el-button @click="handleAddCancel" title="取消" :icon="Close" type="danger"
							   link></el-button>
				</div>
			</template>
		</div>
	</div>

	<el-empty v-if="typeMappingLoading.isLoading()" style="height: 55vh;"></el-empty>
</template>

<style scoped>
.type-mapping-line {
	display: grid;
	grid-template-columns: 15em 5em 15em 1fr 3em;
	grid-gap: 5px;
	height: 2em;
	line-height: 2em;
}
</style>