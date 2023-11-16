<script setup lang="ts">
import {onMounted, ref, toRaw, watch} from 'vue'
import {GenTableColumnsInput} from "../../../api/__generated/model/static";
import {GenTableColumnsInput_TargetOf_columns} from "../../../api/__generated/model/static/GenTableColumnsInput.ts";
import {ArrowDown, ArrowUp, Delete, Plus} from "@element-plus/icons-vue";
import ColumnIcon from "../../icons/database/ColumnIcon.vue";
import {api} from "../../../api";
import {objToMap} from "../../../utils/mapOperation.ts";
import {useLoading} from "../../../hooks/useLoading.ts";
import {sendMessage} from "../../../utils/message.ts";
import {useModelEditorStore} from "../../ModelEditor/store/ModelEditorStore.ts";
import {swapItems} from "../../../utils/arrayOperation.ts";

const store = useModelEditorStore()

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

	if (nameSet.size < table.value.columns.length) {
		messageList.push('列名不可重复')
	}

	if (table.value.columns.filter(column => column.partOfPk).length != 1) {
		messageList.push('表必须有且仅有一个主键列')
	} else {
		const pk = table.value.columns.filter(column => column.partOfPk)[0]

		if (!pk.partOfUniqueIdx) {
			messageList.push('主键列必须唯一')
		}

		if (!pk.typeNotNull) {
			messageList.push('主键列必须非空')
		}
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

const handleMoveColumnUp = (index: number) => {
	swapItems(table.value.columns, index, index - 1)
}

const handleMoveColumnDown = (index: number) => {
	swapItems(table.value.columns, index, index + 1)
}

const handleAddColumn = (index: number) => {
	table.value.columns.splice(index + 1, 0, {...defaultColumn})
}

const handleRemoveColumn = (removedIndex: number) => {
	table.value.columns = table.value.columns.filter((_, index) => index != removedIndex)
}


const handleColumnToPk = (pkIndex: number) => {
	const pkColumn = table.value.columns[pkIndex]
	pkColumn.typeNotNull = true
	pkColumn.type = "BIGINT"
	pkColumn.typeCode = columnTypeMap.value!.get(pkColumn.type)!
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
		<el-form v-if="!columnTypeMapLoading.isLoading()" style="width: 98%;">
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
					<el-input v-model="table.remark" placeholder="remark" type="textarea"
							  :autosize="{ minRows: 1, maxRows: 4 }"></el-input>
				</el-col>
			</el-row>

			<div v-for="(column, index) in table.columns"
				 style="height: 2em; line-height: 2em; display: grid; grid-template-columns: 1.5em 2em 1fr 1.2fr 1.5em 1fr 1.5fr 1.5em 1fr 4em; grid-gap: 0.2em;">
				<span>
					<ColumnIcon :column="column"></ColumnIcon>
				</span>

				<span style="white-space: nowrap;">
					<el-tooltip content="主键" :auto-close="500">
						<el-checkbox v-model="column.partOfPk"
									 @change="(value: boolean) => {if (value) handleColumnToPk(index)}"
									 style="width: 1em; padding: 0; margin: 0;"></el-checkbox>
					</el-tooltip>
					<el-tooltip v-if="column.partOfPk" content="自增" :auto-close="500">
						<el-checkbox v-model="column.autoIncrement"
									 style="width: 1em; padding: 0; margin: 0;"></el-checkbox>
					</el-tooltip>
				</span>

				<span>
					<el-input v-model="column.name" placeholder="name"></el-input>
				</span>

				<el-text class="comment">
					<span>/* </span>
					<span><el-input v-model="column.comment" placeholder="comment"></el-input></span>
					<span> */</span>
				</el-text>

				<span>
					<el-tooltip content="不重复" :auto-close="500">
						<el-checkbox v-model="column.partOfUniqueIdx"></el-checkbox>
					</el-tooltip>
				</span>

				<span>
					<el-tooltip :auto-close="500">
						<el-select v-model="column.type" filterable clearable
								   @change="(value: string) => {column.typeCode = columnTypeMap.get(value)!}">
							<el-option v-for="type in [...columnTypeMap.keys()]" :value="type"></el-option>
						</el-select>

						<template #content>
							对应 java.sql.Types 中的 {{ column.typeCode }}
						</template>
					</el-tooltip>
				</span>

				<el-text style="display: grid; grid-template-columns: 0.5em 1fr 1em 1fr 0.5em">
					<span>(</span>
					<span><el-input v-model="column.displaySize"></el-input></span>
					<span style="padding-left: 0.3em;">,</span>
					<span><el-input v-model="column.numericPrecision"></el-input></span>
					<span style="padding-left: 0.3em;">)</span>
				</el-text>

				<span>
					<el-tooltip content="非空" :auto-close="500">
						<el-checkbox v-model="column.typeNotNull"></el-checkbox>
					</el-tooltip>
				</span>

				<span>
					<el-tooltip :auto-close="2000">
						<el-input v-model="column.defaultValue" placeholder="default"></el-input>

						<template #content>
							此处将直接拼入 ddl，如果是字符串请加上引号
						</template>
					</el-tooltip>
				</span>
				<span style="white-space: nowrap;">
					<el-button :icon="ArrowUp" @click="handleMoveColumnUp(index)" :disabled="index == 0" link></el-button>
					<el-button :icon="ArrowDown" @click="handleMoveColumnDown(index)" :disabled="index == table.columns.length - 1"  style="margin-left: 0.3em;" link></el-button>
					<el-button :icon="Plus" @click="handleAddColumn(index)"  style="margin-left: 0.3em;" link></el-button>
					<el-button :icon="Delete" @click="handleRemoveColumn(index)" type="danger"  style="margin-left: 0.3em;" link></el-button>
				</span>
			</div>

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
	scrollbar-gutter: stable;
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