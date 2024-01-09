<script setup generic="T extends { [key: string]: any }" lang="ts">
import {nextTick, Ref, ref, watch} from 'vue'
import {cloneDeep} from 'lodash'
import {EditListProps} from "@/components/global/list/ListProps.ts";
import LineItem from "@/components/global/list/LineItem.vue";
import Line from "@/components/global/list/Line.vue";
import {Delete, Plus} from "@element-plus/icons-vue";
import {EditListEmits, ListEmits} from "@/components/global/list/ListEmits.ts";
import {useListSelection} from "@/components/global/list/listSelection.ts";
import {useClickOutside} from "@/components/global/list/useClickOutside.ts";
import {sendMessage} from "@/utils/message.ts";

const editList = ref()

const props = withDefaults(
	defineProps<EditListProps<T>>(),
	{
		labelLine: true,
		operation: () => {
			return {
				name: 'operation',
				label: '操作',
				span: '2.5em'
			}
		}
	}
)

const emits = defineEmits<EditListEmits<Partial<T>> & ListEmits<Partial<T>>>()

const listSelection = useListSelection<Partial<T>>()

const cleanSelection = () => {
	listSelection.cleanSelection()
}

const handleItemClick = (e: MouseEvent, item: T) => {
	emits('clickItem', item)

	if (e.ctrlKey) {
		if (!listSelection.isSelected(item)) {
			listSelection.select(item)
		} else {
			listSelection.unselect(item)
		}
	} else {
		cleanSelection()
		listSelection.select(item)
	}
}

useClickOutside(() => editList.value, () => {
	cleanSelection()
})

const handleListClipBoardEvent = async (e: KeyboardEvent) => {
	const selectedItems = listSelection.getRawItems()

	if (e.ctrlKey || e.metaKey) {
		if (e.key == 'c') {
			e.preventDefault()
			await navigator.clipboard.writeText(JSON.stringify(selectedItems))
		} else if (e.key == 'x') {
			e.preventDefault()
			await navigator.clipboard.writeText(JSON.stringify(selectedItems))
			cleanSelection()
			const tempLines = dataLines.value.filter(it => !selectedItems.includes(it))
			emits('update:lines', tempLines)
		} else if (e.key == 'v') {
			e.preventDefault()
			const text = await navigator.clipboard.readText()
			try {
				const value = JSON.parse(text)
				const tempLines = getTempLines()

				let insertIndex = tempLines.findIndex(it => it == selectedItems[selectedItems.length - 1])
				if (insertIndex == -1) insertIndex = tempLines.length - 1

				if (Array.isArray(value) && value.filter(item => props.jsonSchemaValidate(item)).length == value.length) {
					tempLines.splice(insertIndex - 1, 0, ...value)
					emits('update:lines', tempLines)
				} else if (props.jsonSchemaValidate(value)) {
					tempLines.splice(insertIndex - 1, 0, value)
					emits('update:lines', tempLines)
				}
			} catch (e) {
				sendMessage('剪切板中数据无法直接导入列表', 'info', {error: e, clipboardValue: text})
			}
		}
	}

	if (e.key == 'ArrowUp') {
		e.preventDefault()
		let tempLines = getTempLines()
		const selectedItemStr = selectedItems.map(it => JSON.stringify(it))
		const newSelectIndexes: number[] = []

		for (let i = 1; i < tempLines.length; i++) {
			const value = tempLines[i]
			if (selectedItemStr.includes(JSON.stringify(value))) {
				tempLines[i] = tempLines[i - 1]
				tempLines[i - 1] = value
				newSelectIndexes.push(i - 1)
			}
		}

		emits('update:lines', tempLines)

		await nextTick()

		listSelection.cleanSelection()
		newSelectIndexes.forEach(index => {
			listSelection.select(dataLines.value[index])
		})
	}

	if (e.key == 'ArrowDown') {
		e.preventDefault()
		let tempLines = getTempLines()
		const selectedItemStr = selectedItems.map(it => JSON.stringify(it))
		const newSelectIndexes: number[] = []

		for (let i = tempLines.length - 2; i >= 0; i--) {
			const value = tempLines[i]
			if (selectedItemStr.includes(JSON.stringify(value))) {
				tempLines[i] = tempLines[i + 1]
				tempLines[i + 1] = value
				newSelectIndexes.push(i + 1)
			}
		}

		emits('update:lines', tempLines)

		await nextTick()

		listSelection.cleanSelection()
		newSelectIndexes.forEach(index => {
			listSelection.select(dataLines.value[index])
		})
	}
}

const dataLines: Ref<Partial<T>[]> = ref([])

watch(() => props.lines, (lines) => {
	dataLines.value = lines
}, {immediate: true, deep: true})

const getDefaultLine = async (): Promise<Partial<T>> => {
	let defaultLine: Partial<T>

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

	return cloneDeep(defaultLine)
}

const getTempLines = () => {
	return cloneDeep(dataLines.value)
}

const handleAddLine = async (index?: number) => {
	const defaultLine = await getDefaultLine()

	const tempLines = getTempLines()
	if (index != undefined) {
		tempLines.splice(index + 1, 0, defaultLine)
	} else {
		tempLines.push(defaultLine)
	}
	emits('update:lines', tempLines)
}

const handleRemoveLine = (removedIndex: number) => {
	const newDataLines = dataLines.value.filter((_, index) => index != removedIndex)
	const removedLine = dataLines.value[removedIndex]
	listSelection.unselect(removedLine)
	emits('update:lines', newDataLines)
}

defineExpose({
	props,
	emits,
	dataLines,
	getDefaultLine,
	getTempLines,
	handleAddLine,
	handleRemoveLine
})
</script>

<template>
	<div class="edit-list" ref="editList" tabindex="-1" @keydown="handleListClipBoardEvent">
		<div class="edit-list-head">
			<Line v-if="labelLine" :gap="gap" :height="height">
				<LineItem v-for="column in columns" :span="column.span">
					<slot name="label">
						<el-text v-if="column.label" style="padding-left: 0.5em;">{{ column.label }}</el-text>
					</slot>
				</LineItem>
				<LineItem :span="operation.span">
					<el-text v-if="operation.label" style="padding-left: 0.5em;">{{ operation.label }}</el-text>
				</LineItem>
			</Line>
		</div>

		<div class="edit-list-body">
			<slot name="headLines" :columns="columns" :lines="lines"></slot>

			<template v-for="(data, index) in lines">
				<slot name="line" :data="data" :columns="columns" :gap="gap" :height="height">
					<Line :gap="gap" :height="height"
						  @click="(e) => {handleItemClick(e, data)}"
						  :class="listSelection.isSelected(data) ? 'selected' : ''">

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
								:handleAddLine="handleAddLine"
								:handleRemoveLine="handleRemoveLine">

								<slot
									name="beforeOperation"
									:columns="columns"
									:lines="lines"
									:data="data"
									:index="index"
									:getDefaultLine="getDefaultLine"
									:handleAddLine="handleAddLine"
									:handleRemoveLine="handleRemoveLine">
								</slot>

								<el-button @click="handleAddLine(index)"
										   :icon="Plus" link style="margin-left: 0.3em;"></el-button>
								<el-button type="danger" @click="handleRemoveLine(index)"
										   :icon="Delete" link style="margin-left: 0.3em;"></el-button>

								<slot
									name="afterOperation"
									:columns="columns"
									:lines="lines"
									:data="data"
									:index="index"
									:getDefaultLine="getDefaultLine"
									:handleAddLine="handleAddLine"
									:handleRemoveLine="handleRemoveLine">
								</slot>
							</slot>
						</LineItem>
					</Line>
				</slot>
			</template>

			<slot name="tailLines" :columns="columns" :lines="lines" :gap="gap" :height="height">
				<div style="margin: auto; width: min(40%, 6em);">
					<el-button :icon="Plus" style="width: 100%" @click="handleAddLine()"></el-button>
				</div>
				<slot name="otherTailLines" :columns="columns" :lines="lines" :gap="gap" :height="height"></slot>
			</slot>
		</div>
	</div>
</template>
