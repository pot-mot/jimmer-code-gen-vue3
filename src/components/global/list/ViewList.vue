<script setup generic="T extends { [key: string]: any }" lang="ts">
import {ListProps} from "@/components/global/list/ListProps.ts";
import Line from "@/components/global/list/Line.vue";
import LineItem from "@/components/global/list/LineItem.vue";
import {ListEmits} from "@/components/global/list/ListEmits.ts";
import {ref} from "vue";
import {useClickOutside} from "@/components/global/list/useClickOutside.ts";
import {createSelectRange, useListSelection} from "@/components/global/list/listSelection.ts";
import {judgeTargetIsInteraction} from "@/utils/clickUtils.ts";

const props = withDefaults(defineProps<ListProps<T>>(), {
	labelLine: true
})

const emits = defineEmits<ListEmits<T>>()

const {
	lastSelect,
	selectedItemSet,
	isSelected,
	select,
	unselect,
	cleanSelection,
	resetSelection,
} = useListSelection<number>()

const handleItemClick = (e: MouseEvent, item: T, index: number) => {
	emits('clickItem', item, index)

	e.stopPropagation()
	e.stopImmediatePropagation()

	if (e.ctrlKey) {
		if (!isSelected(index)) {
			select(index)
		} else {
			unselect(index)
		}
	} else if (e.shiftKey) {
		e.preventDefault()
		if (lastSelect.value == undefined) {
			select(index)
			return
		}
		resetSelection(createSelectRange(index, lastSelect.value))
	} else {
		if (!judgeTargetIsInteraction(e)) {
			resetSelection([index])
			lastSelect.value = index
		}
	}
}

const viewListBody = ref()

useClickOutside(() => viewListBody.value, () => {
	cleanSelection()
})

const handleListClipBoardEvent = async (e: KeyboardEvent) => {
	if ((e.target as HTMLElement).tagName !== 'DIV') {
		return
	}

	if (e.ctrlKey || e.metaKey) {
		if (e.key === 'c') {
			e.preventDefault()

			const {
				selectedItems
			} = props.lines.reduce(
				(result, _, index) => {
					const {selectedItems} = result
					const item = props.lines[index]

					if (selectedItemSet.value.has(index)) {
						selectedItems.push(item)
					}

					return result
				},
				{selectedItems: <T[]>[]}
			)

			const data = JSON.stringify(selectedItems)
			await navigator.clipboard.writeText(data)
		}
	}
}
</script>

<template>
	<div class="view-list" tabindex="-1" @keydown="handleListClipBoardEvent">
		<div class="view-list-head">
			<Line v-if="labelLine" :gap="gap" :height="height">
				<LineItem v-for="column in columns" :span="column.span">
					<slot name="label">
						<el-text style="padding-left: 0.5em;" v-if="column.label">{{ column.label }}</el-text>
					</slot>
				</LineItem>
			</Line>
		</div>

		<div class="view-list-body" ref="viewListBody">
			<slot name="headLines" :columns="columns" :lines="lines" :gap="gap" :height="height"></slot>

			<template v-for="(data, index) in lines">
				<slot name="line" :data="data" :columns="columns" :gap="gap" :height="height">
					<Line :gap="gap" :height="height"
						  @mousedown="(e) => {handleItemClick(e, data, index)}"
						  :class="isSelected(index) ? 'selected' : ''">

						<LineItem v-for="(column, columnIndex) in columns" :span="column.span">
							<slot
								v-if="'name' in column"
								:name="column.name"
								:span="column.span"
								:prop="column.prop"
								:propData="column.prop ? data[column.prop] : undefined"
								:data="data"
								:index="index"
								:columnIndex="columnIndex">
								<slot name="defaultNoPropItem"
									  :span="column.span"
									  :prop="column.prop"
									  :propData="column.prop ? data[column.prop] : undefined"
									  :data="data"
									  :index="index"
									  :columnIndex="columnIndex">
								</slot>
							</slot>
							<slot
								v-else
								:name="column.prop"
								:span="column.span"
								:prop="column.prop"
								:propData="column.prop ? data[column.prop] : undefined"
								:data="data"
								:index="index"
								:columnIndex="columnIndex">
								<slot name="defaultPropItem"
									  :span="column.span"
									  :prop="column.prop"
									  :propData="column.prop ? data[column.prop] : undefined"
									  :data="data"
									  :index="index"
									  :columnIndex="columnIndex">
									<el-text>{{ column.prop ? data[column.prop] : "" }}</el-text>
								</slot>
							</slot>
						</LineItem>
					</Line>
				</slot>
			</template>

			<slot name="tailLines" :columns="columns" :lines="lines" :gap="gap" :height="height"></slot>
		</div>
	</div>
</template>
