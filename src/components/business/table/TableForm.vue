<script lang="ts" setup>
import {nextTick, onMounted, ref, watch} from 'vue'
import {cloneDeep} from 'lodash'
import {GenEnumView, GenTableColumnsInput} from "@/api/__generated/model/static";
import {GenTableColumnsInput_TargetOf_columns} from "@/api/__generated/model/static/GenTableColumnsInput.ts";
import {api} from "@/api";
import {useLoading} from "@/hooks/useLoading.ts";
import {sendMessage} from "@/utils/message.ts";
import {useModelEditorStore} from "../../pages/ModelEditor/store/ModelEditorStore.ts";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import EditList from "@/components/global/list/EditList.vue";
import ColumnIcon from "@/components/global/icons/database/ColumnIcon.vue";
import {tableColumnColumns} from "@/components/business/table/tableColumnColumns.ts";
import ColumnTypeForm from "@/components/business/table/ColumnTypeForm.vue";

const store = useModelEditorStore()

const columnTypeMapLoading = useLoading()

const databaseTypeObj = ref<{[key:string]: number}>({})

const enums = ref<GenEnumView[]>([])

onMounted(async () => {
	columnTypeMapLoading.start()
	await nextTick()

	await getDatabaseTypeObj()
	await getEnums()

	await nextTick()
	columnTypeMapLoading.end()
})

const getDatabaseTypeObj = async () => {
	databaseTypeObj.value = await api.modelService.listDatabaseType()
}

const getEnums = async () => {
	enums.value = await api.enumService.query({query: {}})
}


const defaultTable: GenTableColumnsInput = {
	name: "",
	comment: "",
	remark: "",
	orderKey: 0,
	type: "TABLE",
	columns: []
}

const defaultColumn: GenTableColumnsInput_TargetOf_columns = {
	orderKey: 0,
	name: "",
	comment: "",
	type: "VARCHAR",
	typeCode: 12,
	typeNotNull: true,
	displaySize: 0,
	numericPrecision: 0,
	defaultValue: undefined,
	partOfPk: false,
	autoIncrement: false,
	partOfFk: false,
	partOfUniqueIdx: false,
	remark: "",
	logicalDelete: false,
	businessKey: false,
	enumId: undefined,
}

interface ModelFormProps {
	id?: string,
	table?: GenTableColumnsInput
}

const props = defineProps<ModelFormProps>()

const emits = defineEmits<FormEmits<GenTableColumnsInput>>()

const table = ref<GenTableColumnsInput>(cloneDeep(defaultTable))

watch(() => props.table, (value) => {
	if (!value) return

	table.value = cloneDeep(value)

}, {immediate: true})

const checkConfig = ref({
	onlyOnePk: true
})

const handleColumnToPk = (pkIndex: number) => {
	if (!databaseTypeObj.value) {
		sendMessage('数据库类型未成功获取')
		return
	}

	const pkColumn = table.value.columns[pkIndex]
	pkColumn.typeNotNull = true
	pkColumn.type = "BIGINT"
	pkColumn.typeCode = databaseTypeObj.value[pkColumn.type]!
	pkColumn.partOfUniqueIdx = true
	pkColumn.defaultValue = undefined

	if (checkConfig.value.onlyOnePk) {
		table.value.columns.forEach((column, index) => {
			if (index != pkIndex && column.partOfPk) {
				column.partOfPk = false
				column.autoIncrement = false
			}
		})
	}
}

const handleSubmit = () => {
	const messageList: string[] = []

	if (table.value.name.trim().length == 0) {
		messageList.push('表名不得为空')
	}

	if (store.nodes
		.filter(node => node.id != props.id)
		.map(it => it.getData().table.name.trim())
		.filter(name => name == table.value.name.trim())
		.length > 0) {
		messageList.push('表名不可重复')
	}

	const nameSet = new Set<string>(table.value.columns.map(it => it.name.trim()))

	for (let columnName of nameSet.values()) {
		if (columnName.length == 0) {
			messageList.push('列名不得为空')
			break
		}
	}

	if (nameSet.size != table.value.columns.length) {
		messageList.push('列名不可重复')
	}

	const pkColumns = table.value.columns.filter(column => column.partOfPk)

	if (pkColumns.length == 0) {
		messageList.push('表必须有至少一个主键列')
	} else {
		if (pkColumns.length > 1 && checkConfig.value.onlyOnePk) {
			messageList.push('实体模型主键列要求仅有一个')
		}

		for (let pkColumn of pkColumns) {
			if (!pkColumn.typeNotNull) {
				messageList.push('主键列必须非空')
			}

			if (pkColumn.defaultValue) {
				pkColumn.defaultValue = undefined
				sendMessage(`主键列[${pkColumn.name}]默认值无意义，已覆盖为 null`, 'warning')
			}
		}
	}

	if (messageList.length > 0) {
		messageList.forEach(it => sendMessage(it, 'warning'))
		return
	}

	table.value.columns.forEach((column, index) => {
		column.orderKey = index + 1
	})

	emits('submit', table.value)
}

const handleCancel = () => {
	emits('cancel', table.value)
}
</script>

<template>
	<el-form v-if="!columnTypeMapLoading.isLoading()" style="width: 98%;">
		<el-row :gutter="12" style="line-height: 2em; padding-left: 1em;">
			<el-col :span="6">
				<el-input v-model="table.name" placeholder="name"></el-input>
			</el-col>

			<el-col :span="8">
				<el-text class="comment">
					<span>/* </span>
					<span><el-input v-model="table.comment" placeholder="comment"></el-input></span>
					<span> */</span>
				</el-text>
			</el-col>

			<el-col :span="18">
				<el-input v-model="table.remark" :autosize="{ minRows: 1, maxRows: 4 }" placeholder="remark"
						  type="textarea"></el-input>
			</el-col>
		</el-row>

		<el-form-item label="唯一主键">
			<el-checkbox v-model="checkConfig.onlyOnePk"></el-checkbox>
		</el-form-item>

		<EditList
			:columns="tableColumnColumns"
			v-model:lines="table.columns"
			:default-line="defaultColumn">

			<template #icon="{data}">
				<ColumnIcon :column="data"></ColumnIcon>
			</template>

			<template #columnType="{data, index}">
				<el-tooltip :auto-close="500" content="主键">
					<el-checkbox v-model="data.partOfPk"
								 class="cling-checkbox"
								 @change="(value: boolean) => {if (value) handleColumnToPk(index)}"></el-checkbox>
				</el-tooltip>

				<el-tooltip v-if="data.partOfPk" :auto-close="500" content="自增">
					<el-checkbox v-model="data.autoIncrement" class="cling-checkbox"></el-checkbox>
				</el-tooltip>

				<el-tooltip v-if="!data.partOfPk" :auto-close="500" content="业务键">
					<el-checkbox v-model="data.businessKey" class="cling-checkbox"></el-checkbox>
				</el-tooltip>
			</template>

			<template #comment="{data}">
				<el-text class="comment">
					<span>/* </span>
					<span><el-input v-model="data.comment" placeholder="comment"></el-input></span>
					<span> */</span>
				</el-text>
			</template>

			<template #partOfUniqueIdx="{data}">
				<el-checkbox v-model="data.partOfUniqueIdx" class="cling-checkbox" :disabled="data.partOfPk"></el-checkbox>
			</template>

			<template #type="{data}">
				<ColumnTypeForm v-if="databaseTypeObj"
								:database-type-obj="databaseTypeObj"
								:enums="enums"
								:model-value="data"
								@updateEnums="getEnums()"></ColumnTypeForm>
			</template>

			<template #typeNotNull="{data}">
				<el-checkbox v-model="data.typeNotNull" :disabled="data.partOfPk"></el-checkbox>
			</template>

			<template #defaultValue="{data}">
				<el-tooltip :auto-close="2000" :disabled="data.partOfPk">
					<el-input v-model="data.defaultValue" placeholder="default" :disabled="data.partOfPk"></el-input>

					<template #content>
						此处将直接拼入 ddl，如果是字符串请加上引号
					</template>
				</el-tooltip>
			</template>
		</EditList>

		<div style="text-align: right;">
			<el-button type="info" @click="handleCancel">取消</el-button>
			<el-button type="warning" @click="handleSubmit">提交</el-button>
		</div>
	</el-form>
	<el-empty v-else></el-empty>
</template>

<style scoped>
.comment {
	display: grid;
	grid-template-columns: 1em 1fr 1em;
	color: var(--el-text-color-placeholder);
	padding-right: 0.5em;
}

.cling-checkbox {
	width: 1em;
	padding: 0;
	margin: 0;
}
</style>
