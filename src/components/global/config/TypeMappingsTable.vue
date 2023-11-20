<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {api} from "@/api";
import {GenTypeMapping} from "@/api/__generated/model/entities";
import {useLoading} from "../../../hooks/useLoading.ts";
import {Check, Close, Delete, EditPen, Plus} from "@element-plus/icons-vue";
import {deleteConfirm} from "@/utils/message.ts";
import {GenTypeMappingInput} from "@/api/__generated/model/static";
import {dataSourceTypes, languages} from "../../../constant/enums.ts";

interface EditState {
	isEdit: Boolean
}

const typeMappings = ref<(GenTypeMapping & EditState)[]>([])

const typeMappingLoading = useLoading()

const defaultTypeMapping = ref<GenTypeMappingInput>()

const newTypeMapping = ref<GenTypeMappingInput>({
	dataSourceType: "MySQL",
	language: "JAVA",
	propertyType: "",
	remark: "",
	typeExpression: ""
})

const getData = async () => {
	typeMappingLoading.start()

	defaultTypeMapping.value = await api.typeMappingService.getDefault()

	newTypeMapping.value = {...defaultTypeMapping.value}

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

const handleAdd = async () => {
	await api.typeMappingService.create({body: newTypeMapping.value})
	addState.value = false
	await getData()
}

const handleAddCancel = () => {
	newTypeMapping.value = {
		...newTypeMapping.value,
		...defaultTypeMapping.value
	}
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
				数据源类型
			</el-text>
			<el-text>
				数据库类型匹配表达式（正则）
			</el-text>
			<el-text>
				语言
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

		<div v-for="typeMapping in typeMappings" class="type-mapping-line">
			<template v-if="!typeMapping.isEdit">
				<el-text>
					{{ typeMapping.dataSourceType }}
				</el-text>
				<el-text>
					{{ typeMapping.typeExpression }}
				</el-text>
				<el-text>
					{{ typeMapping.language }}
				</el-text>
				<el-text>
					{{ typeMapping.propertyType }}
				</el-text>
				<el-text>
					{{ typeMapping.remark }}
				</el-text>
				<el-text>
					<el-button :icon="EditPen" link title="编辑" type="warning"
							   @click="typeMapping.isEdit = true"></el-button>
					<el-button :icon="Delete" link title="删除" type="danger"
							   @click="handleDelete(typeMapping)"></el-button>
				</el-text>
			</template>
			<template v-else>
				<div>
					<el-select v-model="typeMapping.dataSourceType">
						<el-option v-for="dataSourceType in dataSourceTypes" :value="dataSourceType"></el-option>
					</el-select>
				</div>
				<div>
					<el-input v-model="typeMapping.typeExpression"></el-input>
				</div>
				<div>
					<el-select v-model="typeMapping.language">
						<el-option v-for="language in languages" :value="language"></el-option>
					</el-select>
				</div>
				<div>
					<el-input v-model="typeMapping.propertyType"></el-input>
				</div>
				<div>
					<el-input v-model="typeMapping.remark"></el-input>
				</div>
				<div>
					<el-button :icon="Check" link title="保存" type="success"
							   @click="handleEditCancel(typeMapping.id)"></el-button>
					<el-button :icon="Close" link title="取消" type="danger"
							   @click="handleEdit(typeMapping)"></el-button>
				</div>
			</template>
		</div>

		<div class="type-mapping-line">
			<div v-if="!addState">
				<el-button :icon="Plus" @click="addState = true"></el-button>
			</div>
			<template v-else>
				<div>
					<el-select v-model="newTypeMapping.dataSourceType">
						<el-option v-for="dataSourceType in dataSourceTypes" :value="dataSourceType"></el-option>
					</el-select>
				</div>
				<div>
					<el-input v-model="newTypeMapping.typeExpression"></el-input>
				</div>
				<div>
					<el-select v-model="newTypeMapping.language">
						<el-option v-for="language in languages" :value="language"></el-option>
					</el-select>
				</div>
				<div>
					<el-input v-model="newTypeMapping.propertyType"></el-input>
				</div>
				<div>
					<el-input v-model="newTypeMapping.remark"></el-input>
				</div>
				<div>
					<el-button :icon="Check" link title="保存" type="success"
							   @click="handleAdd"></el-button>
					<el-button :icon="Close" link title="取消" type="danger"
							   @click="handleAddCancel"></el-button>
				</div>
			</template>
		</div>
	</div>

	<el-empty v-if="typeMappingLoading.isLoading()" style="height: 55vh;"></el-empty>
</template>

<style scoped>
.type-mapping-line {
	display: grid;
	grid-template-columns: 7em 1fr 7em 1fr 1fr 3em;
	grid-gap: 0.2em;
	height: 2em;
	line-height: 2em;
	white-space: nowrap;
}
</style>