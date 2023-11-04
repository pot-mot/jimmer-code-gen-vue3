<script setup lang="ts">
import {onMounted, ref, toRaw, watch} from 'vue'
import {GenTableColumnsInput} from "../../../api/__generated/model/static";
import {GenTableColumnsInput_TargetOf_columns} from "../../../api/__generated/model/static/GenTableColumnsInput.ts";
import {Delete, Plus} from "@element-plus/icons-vue";
import ColumnIcon from "../../icons/database/ColumnIcon.vue";
import {api} from "../../../api";
import {objToMap} from "../../../utils/mapOperation.ts";
import {useLoading} from "../../../hooks/useLoading.ts";
import {sendMessage} from "../../../utils/message.ts";

const columnTypeMap = ref(new Map<string, number>)

const columnTypeMapLoading = useLoading()

onMounted(async () => {
	columnTypeMapLoading.start()

	const columnTypeMapObj = await api.modelService.listDataBaseType()
	columnTypeMap.value = objToMap(columnTypeMapObj)

	columnTypeMapLoading.end()
})


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
	notNull: true,
	displaySize: 0,
	numericPrecision: 0,
	defaultValue: undefined,
	partOfPk: false,
	autoIncrement: false,
	partOfFk: false,
	partOfUniqueIdx: false,
	remark: "",
}

interface ModelFormProps {
	table?: GenTableColumnsInput
}

const props = defineProps<ModelFormProps>()

interface ModelFormEmits {
	(event: "submit", table: GenTableColumnsInput): void,
	(event: "cancel", table: GenTableColumnsInput): void
}

const emits = defineEmits<ModelFormEmits>()

const table = ref<GenTableColumnsInput>({...defaultTable})

watch(() => props.table, () => {
	if (!props.table) return

	table.value = {
		...table.value,
		...toRaw(props.table),
		columns: [
			...defaultTable.columns,
			...Object.values(toRaw(props.table.columns)).map(it => {
				return {...it}
			})
		]
	}
}, {immediate: true})

const handleSubmit = () => {
	const messageList: string[] = []

	if (table.value.name.trim().length == 0) {
		messageList.push('模型名称不得为空')
	}
	if (table.value.columns.filter(column => column.partOfPk).length != 1) {
		messageList.push('模型必须有且仅有一个主键列')
	}
	if (table.value.columns.filter(column => column.name.trim().length == 0).length > 0) {
		messageList.push('列名称不得为空')
	}

	if (messageList.length > 0) {
		messageList.forEach(it => sendMessage(it, 'warning'))
		return
	}

	emits('submit', table.value)
}

const handleCancel = () => {
	emits('cancel', table.value)
}

const handleAddColumn = (index: number) => {
	table.value.columns.splice(index + 1, 0, {...defaultColumn})
}

const handleRemoveColumn = (removedIndex: number) => {
	table.value.columns = table.value.columns.filter((_, index) => index != removedIndex)
}

const handleColumnToPk = (pkIndex: number) => {
	const pkColumn = table.value.columns[pkIndex]
	pkColumn.notNull = true
	pkColumn.type = "BIGINT"
	pkColumn.partOfUniqueIdx = true

	table.value.columns.forEach((column, index) => {
		if (index != pkIndex && column.partOfPk) {
			column.partOfPk = false
		}
	})
}
</script>

<template>
	<div class="wrapper">
		<el-form v-if="!columnTypeMapLoading.isLoading()">
			<el-row style="line-height: 2em; padding-left: 1em;" :gutter="12">
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
					<el-input v-model="table.remark" placeholder="remark" type="textarea" :autosize="{ minRows: 1, maxRows: 4 }"></el-input>
				</el-col>
			</el-row>

			<template v-for="(column, index) in table.columns">
				<el-row style="height: 2em; line-height: 2em;" :gutter="8">
					<el-col :span="0.5">
						<ColumnIcon :column="column"></ColumnIcon>
					</el-col>

					<el-col :span="1">
						<el-tooltip content="主键">
							<el-checkbox v-model="column.partOfPk"
										 @change="(value: boolean) => {if (value) handleColumnToPk(index)}"
										 style="width: 1em; padding: 0; margin: 0;"></el-checkbox>
						</el-tooltip>
						<el-tooltip v-if="column.partOfPk" content="自增">
							<el-checkbox v-model="column.autoIncrement"
										 style="width: 1em; padding: 0; margin: 0;"></el-checkbox>
						</el-tooltip>
					</el-col>

					<el-col :span="3">
						<el-input v-model="column.name" placeholder="name"></el-input>
					</el-col>
					<el-col :span="4">
						<el-text class="comment">
							<span>/* </span>
							<span><el-input v-model="column.comment" placeholder="comment"></el-input></span>
							<span> */</span>
						</el-text>
					</el-col>

					<el-col :span="0.5">
						<el-tooltip content="不重复">
							<el-checkbox v-model="column.partOfUniqueIdx"></el-checkbox>
						</el-tooltip>
					</el-col>

					<el-col :span="3">
						<el-tooltip>
							<el-select v-model="column.type"
									   @change="(value: string) => {column.typeCode = columnTypeMap.get(value)!}">
								<el-option v-for="type in [...columnTypeMap.keys()]" :value="type"></el-option>
							</el-select>

							<template #content>
								对应 java.sql.Types 中的 {{ column.typeCode }}
							</template>
						</el-tooltip>
					</el-col>
					<el-col :span="5">
						<el-text style="display: grid; grid-template-columns: 0.5em 1fr 1em 1fr 0.5em">
							<span>(</span>
							<span><el-input v-model="column.displaySize"></el-input></span>
							<span style="padding-left: 0.3em;">,</span>
							<span><el-input v-model="column.numericPrecision"></el-input></span>
							<span style="padding-left: 0.3em;">)</span>
						</el-text>
					</el-col>
					<el-col :span="0.5">
						<el-tooltip content="非空">
							<el-checkbox v-model="column.notNull"></el-checkbox>
						</el-tooltip>
					</el-col>

					<el-col :span="3">
						<el-input v-model="column.defaultValue" placeholder="default"></el-input>
					</el-col>
					<el-col :span="2">
						<el-button :icon="Plus" @click="handleAddColumn(index)" link></el-button>
						<el-button :icon="Delete" @click="handleRemoveColumn(index)" type="danger" link></el-button>
					</el-col>
				</el-row>
			</template>

			<div style="height: 2em; line-height: 2em; transform: translateY(-5px);">
				<el-button :icon="Plus" @click="handleAddColumn(table.columns.length - 1)" link></el-button>
			</div>

			<div style="text-align: right;">
				<el-button @click="handleCancel" type="info">取消</el-button>
				<el-button @click="handleSubmit" type="warning">提交</el-button>
			</div>
		</el-form>
		<el-empty v-else class="empty"></el-empty>
	</div>
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

.comment {
	display: grid;
	grid-template-columns: 1em 1fr 1em;
	color: var(--el-text-color-placeholder);
	padding-right: 0.5em;
}
</style>