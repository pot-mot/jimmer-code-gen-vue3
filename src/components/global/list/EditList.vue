<script setup generic="T extends { [key: string]: any }" lang="ts">
import {nextTick, Ref, ref, watch} from 'vue'
import {cloneDeep} from 'lodash'
import {EditListProps} from "@/components/global/list/ListProps.ts";
import LineItem from "@/components/global/list/LineItem.vue";
import Line from "@/components/global/list/Line.vue";
import {Delete, Plus} from "@element-plus/icons-vue";
import {EditListEmits, ListEmits} from "@/components/global/list/ListEmits.ts";
import {useClickOutside} from "@/components/global/list/useClickOutside.ts";
import {sendMessage} from "@/message/message.ts";
import {useListSelection} from "@/components/global/list/listSelection.ts";
import {judgeTargetIsInteraction} from "@/utils/clickUtils.ts";

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

const emits = defineEmits<EditListEmits<T> & ListEmits<T>>()

const {
	selectedItemSet,
	isSelected,
	select,
	unselect,
	cleanSelection,
	resetSelection,
} = useListSelection<number>()

const handleItemClick = (e: MouseEvent, item: T, index: number) => {
	emits('clickItem', item, index)

	if (e.ctrlKey) {
		if (!isSelected(index)) {
			select(index)
		} else {
			unselect(index)
		}
	} else {
		if (!judgeTargetIsInteraction(e)) {
			resetSelection([index])
		}
	}
}

const editListBody = ref()

useClickOutside(() => editListBody.value, () => {
	cleanSelection()
})

const handleListClipBoardEvent = async (e: KeyboardEvent) => {
	if ((e.target as HTMLElement).tagName !== 'DIV') {
		return
	}

	const {
		selectedItems,
		unselectedItems
	} = dataLines.value.reduce(
		(result, _, index) => {
			const {selectedItems, unselectedItems} = result
			const item = dataLines.value[index]

			if (selectedItemSet.value.has(index)) {
				selectedItems.push(item)
			} else {
				unselectedItems.push(item)
			}

			return result
		},
		{selectedItems: <T[]>[], unselectedItems: <T[]>[]}
	)

	if (e.key === 'Delete') {
		e.preventDefault()
		cleanSelection()
		emits('update:lines', unselectedItems)
	}

	if (e.ctrlKey || e.metaKey) {
		if (e.key === 'c') {
			e.preventDefault()
			await navigator.clipboard.writeText(JSON.stringify(selectedItems))
		} else if (e.key === 'x') {
			e.preventDefault()
			await navigator.clipboard.writeText(JSON.stringify(selectedItems))
			cleanSelection()
			emits('update:lines', unselectedItems)
		} else if (e.key === 'v') {
			e.preventDefault()
			const text = await navigator.clipboard.readText()
			try {
				const value = JSON.parse(text)
				const tempLines = getTempLines()

				let insertIndex = selectedItemSet.value.size > 0 ? Math.max(...selectedItemSet.value.values()) + 1 : selectedItems.length

				let insertLength = 0

				const validateErrorsMap = new Map

				if (
					Array.isArray(value) &&
					value.filter((item, index) => props.jsonSchemaValidate(item, (e) => validateErrorsMap.set(index, e))).length === value.length
				) {
					tempLines.splice(insertIndex, 0, ...value)
					insertLength = value.length
				} else if (props.jsonSchemaValidate(value, (e) => validateErrorsMap.set(0, e))) {
					tempLines.splice(insertIndex, 0, value)
					insertLength = 1
				} else {
					sendMessage('剪切板中数据无法直接导入列表', 'error', validateErrorsMap)
					return
				}

				emits('update:lines', tempLines)
				await nextTick()

				cleanSelection()
				for (let i = insertIndex; i < insertIndex + insertLength; i++) {
					select(i)
				}
			} catch (e) {
				sendMessage('剪切板中数据无法直接导入列表', 'error', {error: e, clipboardValue: text})
			}
		}
	}

	if (e.key === 'ArrowUp') {
		e.preventDefault()
		let tempLines = getTempLines()
		const newSelectIndexes: Set<number> = new Set

		for (let i = 0; i < tempLines.length; i++) {
			const value = tempLines[i]
			if (selectedItemSet.value.has(i)) {
				if (i === 0 || newSelectIndexes.has(i - 1)) {
					newSelectIndexes.add(i)
				} else {
					tempLines[i] = tempLines[i - 1]
					tempLines[i - 1] = value
					newSelectIndexes.add(i - 1)
				}
			}
		}

		emits('update:lines', tempLines)

		await nextTick()

		resetSelection([...newSelectIndexes])
	}

	if (e.key === 'ArrowDown') {
		e.preventDefault()
		let tempLines = getTempLines()
		const newSelectIndexes: Set<number> = new Set

		for (let i = tempLines.length - 1; i >= 0; i--) {
			const value = tempLines[i]
			if (selectedItemSet.value.has(i)) {
				if (i === tempLines.length - 1 || newSelectIndexes.has(i + 1)) {
					newSelectIndexes.add(i)
				} else {
					tempLines[i] = tempLines[i + 1]
					tempLines[i + 1] = value
					newSelectIndexes.add(i + 1)
				}
			}
		}

		emits('update:lines', tempLines)

		await nextTick()

		resetSelection([...newSelectIndexes])
	}
}

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

	return cloneDeep(defaultLine)
}

const getTempLines = () => {
	return cloneDeep(dataLines.value)
}

const handleAddLine = async (index: number = dataLines.value.length - 1) => {
	const defaultLine = await getDefaultLine()

	const tempLines = getTempLines()
	tempLines.splice(index + 1, 0, defaultLine)
	emits('update:lines', tempLines)

	await nextTick()

	const newSelectedIndex: number[] = []
	selectedItemSet.value.forEach(i => {
		if (i > index) {
			newSelectedIndex.push(i + 1)
		} else {
			newSelectedIndex.push(i)
		}
	})
	resetSelection(newSelectedIndex)
}

const handleRemoveLine = async (index: number) => {
	const newDataLines = dataLines.value.filter((_, i) => i !== index)
	emits('update:lines', newDataLines)
	await nextTick()
	const newSelectedIndex: number[] = []
	selectedItemSet.value.forEach(i => {
		if (i > index) {
			newSelectedIndex.push(i - 1)
		} else if (i < index) {
			newSelectedIndex.push(i)
		}
	})
	resetSelection(newSelectedIndex)
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
	<div class="edit-list" tabindex="-1" @keydown="handleListClipBoardEvent">
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

		<div class="edit-list-body" ref="editListBody">
			<slot name="headLines" :columns="columns" :lines="lines"></slot>

			<template v-for="(data, index) in lines">
				<slot name="line" :data="data" :columns="columns" :gap="gap" :height="height">
					<Line :gap="gap" :height="height"
						  @click="(e) => {handleItemClick(e, data, index)}"
						  :class="isSelected(index) ? 'selected' : ''">

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

								<el-button @click.prevent.stop="handleAddLine(index)"
										   :icon="Plus" link style="margin-left: 0.3em;"></el-button>
								<el-button @click.prevent.stop="handleRemoveLine(index)"
										   :icon="Delete" link style="margin-left: 0.3em;" type="danger"></el-button>

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
