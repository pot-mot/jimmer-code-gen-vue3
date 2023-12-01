<script lang="ts" generic="T" setup>
import {nextTick, onMounted, onUnmounted, Ref, ref} from "vue";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import {Search} from "@element-plus/icons-vue";
import {
	DialogInitPositionProps,
	DialogInitSizeProps,
	DialogTeleportProps
} from "@/components/global/dialog/DragDialogProps.ts";

interface SearcherProps extends DialogTeleportProps, DialogInitSizeProps, DialogInitPositionProps {
	target: HTMLElement
	search: (keyword: string) => T[] | Promise<T[]>
	choose?: (item: T) => void

	canDrag?: boolean
}

const props = withDefaults(defineProps<SearcherProps>(), {
	canDrag: true
})

interface SearcherSlots {
	empty(props: {}): any

	items(props: { items: T[], choose?: (item: T) => any }): any

	tools(props: { items: T[], choose?: (item: T) => any }): any

	item(props: { items: T[], item: T, choose?: (item: T) => any }): any

	buttonContent(props: { items: T[], item: T }): any
}

defineSlots<SearcherSlots>()

const keyword = ref("")

const searchResult: Ref<T[]> = ref([])

const openState = ref(false)

const mouseenterState = ref(false)

const input = ref()

const dialog = ref()

const x = ref(0)
const y = ref(0)

const handleSearchKeyEvent = (e: KeyboardEvent) => {
	if (e.ctrlKey || e.metaKey) {
		if (e.key == 'f') {
			if (!mouseenterState.value) return

			if (openState.value) return

			e.preventDefault()
			searchResult.value = []

			if (props.initX) x.value = props.initX
			if (props.initY) y.value = props.initY

			openState.value = true

			nextTick(() => {
				dialog.value?.syncDialogHeight()

				input.value?.focus()
			})
		}
	}
}

const searchResultContainer = ref()

const handleSearch = async () => {
	if (keyword.value.trim().length > 0) {
		searchResult.value = await props.search(keyword.value)
	} else {
		searchResult.value = []
	}

	await nextTick()

	dialog.value?.syncDialogHeight()
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
	<DragDialog
		v-model="openState"
		ref="dialog"
		:init-w="initW" :init-h="initH" :init-x="x" :init-y="y" :to="to"
		:can-drag="canDrag"
		fit-content
		@close="handleClose">
		<el-input ref="input" v-model="keyword" clearable @change="handleSearch" @input="handleSearch">
			<template #append>
				<el-button @click="handleSearch" :icon="Search"></el-button>
			</template>
		</el-input>

		<div ref="searchResultContainer" style="max-height: 60vh; overflow: auto;">
			<slot name="tools" :items="searchResult" :choose="choose"></slot>

			<div v-if="keyword.length > 0 && searchResult.length == 0">
				<slot name="empty">
					<el-text>无搜索结果</el-text>
				</slot>
			</div>

			<slot name="items" :items="searchResult" :choose="choose">
				<div v-for="item in searchResult">
					<slot name="item" :items="searchResult" :item="item" :choose="choose">
						<el-button link size="default" @click="choose?.(item)">
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