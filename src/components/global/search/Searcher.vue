<script lang="ts" generic="T, S = string" setup>
import {nextTick, onMounted, onUnmounted, Ref, ref} from "vue";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import {DialogInitProps,} from "@/components/global/dialog/DragDialogProps.ts";

const searchData = defineModel<S | undefined>({
	required: false,
})

interface SearcherProps extends DialogInitProps {
	target: HTMLElement
	search: (keyword: S) => T[] | Promise<T[]>,
	placeholder?: string

	canDrag?: boolean
    fitContent?: boolean
}

const props = withDefaults(defineProps<SearcherProps>(), {
	canDrag: true,
    fitContent: true,
	to: "body",
})

defineSlots<{
	input(props: { handleSearch: () => Promise<void> }): any
	empty(props: {}): any
	items(props: { items: T[] }): any
	tools(props: { items: T[] }): any
	item(props: { items: T[], item: T }): any
	buttonContent(props: { items: T[], item: T }): any
}>()

const emits = defineEmits<{
	(event: "open"): void
	(event: "close"): void
	(event: 'select', item: T): void
}>()

const searchResult: Ref<T[]> = ref([])

const openState = ref(false)

const mouseenterState = ref(false)

const input = ref()

const dialog = ref()

const x = ref(0)
const y = ref(0)

const handleSearchKeyEvent = async (e: KeyboardEvent) => {
	if (e.ctrlKey || e.metaKey) {
		if (e.key === 'f') {
			if (!mouseenterState.value) return

			if (openState.value) return

			e.preventDefault()
			searchResult.value = []

			const box = props.target.getBoundingClientRect()

			if (props.initX) {
				x.value = props.initX
			} else {
				x.value = box.x
			}
			if (props.initY) {
				y.value = props.initY
			} else {
				y.value = box.y
			}

			openState.value = true

            if (searchData.value) {
                await handleSearch()
            }

			await nextTick()

            if (props.fitContent) {
                dialog.value?.syncDialogHeight()
            }

            input.value?.focus()
		}
	}
}

const handleSearch = async () => {
	if (searchData.value) {
		searchResult.value = await props.search(searchData.value)
	} else {
		searchResult.value = []
	}

    if (props.fitContent) {
        await nextTick()

        dialog.value?.syncDialogHeight()
    }
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

const handleOpen = () => {
	emits('open')
}

const handleClose = () => {
	searchResult.value = []
	emits('close')
}

defineExpose<{
	searchResult: Ref<T[]>
}>({
	searchResult
})
</script>

<template>
	<DragDialog
		v-model="openState"
		ref="dialog"
		:init-w="initW" :init-h="initH" :init-x="x" :init-y="y"
		:can-drag="canDrag"
		:can-full-screen="false"
		:fit-content="fitContent"
        :can-resize="!fitContent"
		:modal="false"
		@open="handleOpen"
		@close="handleClose">

		<slot name="input" :handleSearch="handleSearch">
			<el-input
				ref="input"
				v-model="searchData"
				:placeholder="placeholder"
				clearable
				@input="handleSearch"
				@change="handleSearch"
			/>
		</slot>

		<div :style="fitContent ? 'max-height: 60vh; overflow: auto;' : ''">
			<slot name="tools" :items="searchResult"/>

			<template v-if="searchResult.length === 0">
				<slot name="empty">
					<div>
                        <el-text>无搜索结果</el-text>
                    </div>
				</slot>
			</template>

			<slot name="items" :items="searchResult">
				<div v-for="item in searchResult">
					<slot name="item" :items="searchResult" :item="item">
						<el-button link size="default" @click="emits('select', item)">
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
