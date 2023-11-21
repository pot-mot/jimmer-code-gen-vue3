<script lang="ts" setup>
import DragResize from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import {nextTick, onBeforeMount, onMounted, ref, watch} from 'vue'
import {ElButton} from "element-plus";
import {Close} from "@element-plus/icons-vue";
import {DragResizeProps} from "./DragDialogProps.ts";
import {DragDialogEmits} from "./DragDialogEmits.ts";

const props = withDefaults(defineProps<DragResizeProps>(), {
	to: "body",
	canResize: false,
	canDrag: true,
	initW: 800,
	disableTeleport: false,
	limitByParent: true
})

const x = ref(0)
const y = ref(0)
const w = ref(0)
const h = ref(0)

onBeforeMount(() => {
	const maxWidth = document.documentElement.clientWidth

	if (maxWidth < props.initW) {
		x.value = 0
		w.value = maxWidth
	} else if (props.initX) {
		w.value = props.initW

		if (props.initW + props.initX > maxWidth) {
			x.value = maxWidth - props.initW
		} else {
			x.value = props.initX
		}
	} else {
		w.value = props.initW
		x.value = (maxWidth - w.value) / 2
	}

	if (props.initH) {
		h.value = props.initH
	}

	if (props.initY) {
		y.value = props.initY
	}
})

const emits = defineEmits<DragDialogEmits>()

watch(() => props.modelValue, (modelValue) => {
	if (modelValue) {
		emits('open')
	}
})

const close = () => {
	emits("close")
	emits('update:modelValue', false)
	emits("closed")
}

const draggable = ref(true)
const resizable = ref(props.canResize)

const wrapper = ref<HTMLElement>()
const content = ref<HTMLElement>()

const syncDialogHeight = () => {
	if (content.value) {
		if (props.fitContent) {
			content.value.style.height = '0'
			content.value.style.height = 'auto'
		}

		h.value = content.value.scrollHeight + 35
	}
}

const updateContentHeightByWrapperHeight = () => {
	if (wrapper.value && content.value) {
		content.value.style.height = wrapper.value.offsetHeight - 35 + 'px'
	}
}

const wrapperResizeOb = new ResizeObserver(updateContentHeightByWrapperHeight)

onMounted(() => {
	nextTick(() => {
		if (content.value && wrapper.value) {
			wrapperResizeOb.observe(wrapper.value)
		}
	})
})

const handleContentMouseEnter = () => {
	draggable.value = props.canDrag && false
}

const handleContentMouseLeave = () => {
	draggable.value = props.canDrag && true
}

defineExpose({
	syncDialogHeight
})
</script>

<template>
	<template v-if="modelValue">
		<Teleport :disabled="disableTeleport" :to="to">
			<DragResize :active="true"
						:draggable="draggable"
						:resizable="resizable"
						:x="x" :disableX="disableX"
						:y="y" :disableY="disableY"
						:parent="limitByParent"
						:h="h" :maxH="maxH" :minH="minH" :disableH="disableH"
						:w="w" :maxW="maxW" :minW="minW" :disableW="disableW"
						style="border: none; z-index: 2000;">
				<div ref="wrapper" :style="draggable ? 'cursor: all-scroll;' : 'cursor: default;'" class="wrapper">
					<div class="close" @click="close">
						<slot name="close">
							<el-button :icon="Close" link size="large" type="danger"></el-button>
						</slot>
					</div>
					<div ref="content" class="content"
						 @mouseenter="handleContentMouseEnter" @mouseleave="handleContentMouseLeave">
						<slot></slot>
					</div>
				</div>
			</DragResize>
		</Teleport>
	</template>
</template>

<style scoped>
.close {
	position: absolute;
	top: 0;
	right: 0;
	cursor: pointer;
	padding: 0 5px;
	font-weight: 600;
}

.wrapper {
	height: 100%;
	width: 100%;
	overflow: hidden;
	padding: 20px 10px 10px;
	background-color: #fff;
	border-radius: var(--el-border-radius-base);
	box-shadow: var(--el-box-shadow);
	position: relative;
}

.content {
	cursor: default;
	height: 100%;
	width: 100%;
	overflow: auto;
}

:deep(.handle) {
	width: 8px;
	height: 8px;
	border: none;
	background-color: transparent;
}

:deep(.handle-tl),
:deep(.handle-tm),
:deep(.handle-tr) {
	top: 0;
}

:deep(.handle-bl),
:deep(.handle-bm),
:deep(.handle-br) {
	bottom: 0;
}

:deep(.handle-tl),
:deep(.handle-ml),
:deep(.handle-bl) {
	left: 0;
}

:deep(.handle-tr),
:deep(.handle-mr),
:deep(.handle-br) {
	right: 0;
}

:deep(.handle-tm) {
	width: calc(100% - 16px);
	left: 11px;
}

:deep(.handle-bm) {
	width: calc(100% - 16px);
	left: 12px;
}

:deep(.handle-ml),
:deep(.handle-mr) {
	height: calc(100% - 16px);
	top: 11px;
}
</style>