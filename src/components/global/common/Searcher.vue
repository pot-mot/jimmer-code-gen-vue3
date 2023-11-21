<script lang="ts" setup>
import {nextTick, onMounted, onUnmounted, ref} from "vue";
import DragDialog from "@/components/global/dialog/DragDialog.vue";

interface SearcherProps<T> {
	target: HTMLElement
	data: () => T[]
	match: (keyword: string, item: T) => Boolean
	choose: (item: T) => void
	to?: string
	initX?: number
	initY?: number

}

const props = defineProps<SearcherProps<any>>()

const keyword = ref("")

const searchResult = ref<Node[]>([])

const openState = ref(false)

const mouseenterState = ref(false)

const input = ref()

const dialog = ref()

const handleSearchKeyEvent = (e: KeyboardEvent) => {
	if (e.ctrlKey || e.metaKey) {
		if (e.key == 'f') {
			if (!mouseenterState.value) return

			if (openState.value) return

			e.preventDefault()
			searchResult.value = []
			openState.value = true
			nextTick(() => {
				dialog.value?.syncDialogHeight()

				input.value?.focus()
			})
		}
	}
}

const searchResultContainer = ref()

const handleSearch = () => {
	if (keyword.value.trim().length > 0) {
		if (keyword.value.length == 0) {
			searchResult.value = []
		} else {
			searchResult.value = props.data().filter(item => {
				return props.match(keyword.value, item)
			})
		}
	} else {
		searchResult.value = []
	}

	nextTick(() => {
		dialog.value?.syncDialogHeight()
	})
}

const handleMouseenter = () => {
	mouseenterState.value = true
}

const handleMouseleave = () => {
	mouseenterState.value = false
}

onMounted(() => {
	props.target.addEventListener('mouseenter', handleMouseenter)

	props.target.addEventListener('mouseleave', handleMouseleave)

	document.documentElement.addEventListener('keydown', handleSearchKeyEvent)
})

onUnmounted(() => {
	props.target.removeEventListener('mouseenter', handleMouseenter)

	props.target.removeEventListener('mouseleave', handleMouseleave)

	document.documentElement.removeEventListener('keydown', handleSearchKeyEvent)
})

const handleClose = () => {
	keyword.value = ''
	searchResult.value = []
}
</script>

<template>
	<DragDialog v-model="openState" ref="dialog" :init-w="400" :init-x="initX" :init-y="initY" :to="to" fit-content @close="handleClose">
		<el-input ref="input" v-model="keyword" clearable @change="handleSearch" @input="handleSearch">
			<template #append>
				<el-button @click="handleSearch">搜索</el-button>
			</template>
		</el-input>

		<div ref="searchResultContainer" style="max-height: 60vh; overflow: auto;">
			<div v-if="keyword.length > 0 && searchResult.length == 0">
				<slot name="empty" :keyword="keyword">
					<el-text>无搜索结果</el-text>
				</slot>
			</div>

			<slot name="items" :items="searchResult" :choose="choose">
				<div v-for="item in searchResult">
					<slot name="item" :items="searchResult" :item="item" :choose="choose">
						<el-button link size="default" @click="choose(item)">
							<slot name="buttonContent" :items="searchResult" :item="item">
								{{ item }}
							</slot>
						</el-button>
					</slot>
				</div>
			</slot>
		</div>
	</DragDialog>
</template>