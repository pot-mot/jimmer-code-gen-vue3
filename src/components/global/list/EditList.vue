<script setup generic="T extends { [key: string]: any }" lang="ts">
import {Ref, ref, watch} from 'vue'
import {EditListEmits, EditListProps} from "@/components/global/list/ListProps.ts";
import LineItem from "@/components/global/list/LineItem.vue";
import Line from "@/components/global/list/Line.vue";
import {ArrowDown, ArrowUp, Delete, Plus} from "@element-plus/icons-vue";
import {swapItems} from "@/utils/arrayOperation.ts";

const props = withDefaults(
	defineProps<EditListProps<T>>(),
	{
		labelLine: true,
		operation: () => {
			return {
				name: 'operation',
				label: '操作',
				span: '5em'
			}
		}
	}
)

const emits = defineEmits<EditListEmits<T>>()

const dataLines: Ref<T[]> = ref([])

watch(() => props.lines, (lines) => {
	dataLines.value = lines
}, {immediate: true, deep: true})

const getDefaultLine = async (): Promise<T> => {
	let defaultLine: T

	if (props.defaultLine instanceof Function) {
		const temp = props.defaultLine()
		if (temp instanceof Promise) {
			defaultLine = await temp
		} else {
			defaultLine = temp
		}
	} else {
		defaultLine = <T>props.defaultLine
	}

	return {...defaultLine}
}

const handleMoveLineUp = (index: number) => {
	const tempLines = [...dataLines.value]
	swapItems(tempLines, index, index - 1)
	emits('update:lines', tempLines)
}

const handleMoveLineDown = (index: number) => {
	const tempLines = [...dataLines.value]
	swapItems(tempLines, index, index + 1)
	emits('update:lines', tempLines)
}

const handleAddLine = async (index?: number) => {
	const defaultLine = await getDefaultLine()

	const tempLines = [...dataLines.value]

	if (index != undefined) {
		tempLines.splice(index + 1, 0, defaultLine)
	} else {
		tempLines.push(defaultLine)
	}
	emits('update:lines', tempLines)
}

const handleRemoveLine = (removedIndex: number) => {
	emits('update:lines', dataLines.value.filter((_, index) => index != removedIndex))
}

defineExpose({
	props,
	dataLines,
	getDefaultLine,
	handleMoveLineUp,
	handleMoveLineDown,
	handleAddLine,
	handleRemoveLine
})
</script>

<template>
	<Line v-if="labelLine" :gap="gap" :height="height">
		<LineItem v-for="column in columns" :span="column.span">
			<slot name="label">
				<el-text v-if="column.label">{{ column.label }}</el-text>
			</slot>
		</LineItem>
		<LineItem :span="operation.span">
			<el-text v-if="operation.label">{{ operation.label }}</el-text>
		</LineItem>
	</Line>

	<slot name="headLines" :columns="columns" :lines="lines"></slot>

	<template v-for="(data, index) in lines">
		<slot name="line" :data="data" :columns="columns" :gap="gap" :height="height">
			<Line :gap="gap" :height="height">
				<LineItem v-for="column in columns" :span="column.span">
					<slot
						v-if="'name' in column"
						:name="column.name"
						:span="column.span"
						:prop="column.prop"
						:propData="column.prop ? data[column.prop] : undefined"
						:data="data"
						:index="index">
						<slot name="defaultNoPropItem"
							  :span="column.span"
							  :prop="column.prop"
							  :propData="column.prop ? data[column.prop] : undefined"
							  :data="data"
							  :index="index">
						</slot>
					</slot>
					<slot
						v-else
						:name="column.prop"
						:span="column.span"
						:prop="column.prop"
						:propData="column.prop ? data[column.prop] : undefined"
						:data="data"
						:index="index">
						<slot name="defaultPropItem"
							  :span="column.span"
							  :prop="column.prop"
							  :propData="column.prop ? data[column.prop] : undefined"
							  :data="data"
							  :index="index">
							<el-input v-model="data[column.prop]"></el-input>
						</slot>
					</slot>
				</LineItem>

				<LineItem :span="operation.span">
					<slot
						name="operation"
						:columns="columns"
						:lines="lines"
						:data="data"
						:index="index"
						:getDefaultLine="getDefaultLine"
						:handleMoveLineUp="handleMoveLineUp"
						:handleMoveLineDown="handleMoveLineDown"
						:handleAddLine="handleAddLine"
						:handleRemoveLine="handleRemoveLine">
						<el-button :disabled="index == 0"
								   @click="handleMoveLineUp(index)"
								   :icon="ArrowUp" link></el-button>
						<el-button :disabled="index == lines.length - 1"
								   @click="handleMoveLineDown(index)"
								   :icon="ArrowDown" link style="margin-left: 0.3em;"></el-button>
						<el-button @click="handleAddLine(index)"
								   :icon="Plus" link style="margin-left: 0.3em;"></el-button>
						<el-button type="danger" @click="handleRemoveLine(index)"
								   :icon="Delete" link style="margin-left: 0.3em;"></el-button>

						<slot
							name="otherOperation"
							:columns="columns"
							:lines="lines"
							:data="data"
							:index="index"
							:getDefaultLine="getDefaultLine"
							:handleMoveLineUp="handleMoveLineUp"
							:handleMoveLineDown="handleMoveLineDown"
							:handleAddLine="handleAddLine"
							:handleRemoveLine="handleRemoveLine">
						</slot>
					</slot>
				</LineItem>
			</Line>
		</slot>
	</template>

	<slot name="tailLines" :columns="columns" :lines="lines" :gap="gap" :height="height">
		<el-button :icon="Plus" style="width: 100%;" @click="handleAddLine()" link></el-button>
		<slot name="otherTailLines" :columns="columns" :lines="lines" :gap="gap" :height="height"></slot>
	</slot>
</template>