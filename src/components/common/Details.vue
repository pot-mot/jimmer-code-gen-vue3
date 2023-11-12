<template>
	<div>
		<div :class="position" :style="{paddingLeft: position == 'left' ? `calc(3px + ${buttonSize})` : 0}"
			 class="title">
			<slot name="title"></slot>
			<div class="button" :style="{width: buttonSize, top: `calc(50% - ${buttonSize}/2)`}" v-if="!disabled"
				 @click="handleToggle">
				<slot name="button">
					<el-icon :size="buttonSize" style="transform: translateY(0.1em);">
						<CaretRight v-if="!openState && position == 'left'"></CaretRight>
						<CaretLeft v-else-if="!openState && position == 'right'"></CaretLeft>
						<CaretBottom v-else></CaretBottom>
					</el-icon>
				</slot>
			</div>
		</div>
		<el-collapse-transition v-if="!disabled">
			<div
				v-show="openState"
				class="content"
				:style="{paddingLeft: position == 'left' ? `calc(3px + ${buttonSize})` : ``}">
				<slot></slot>
			</div>
		</el-collapse-transition>
	</div>
</template>

<style scoped>
.title {
	position: relative;
}

.content {
	overflow-y: hidden;
}

.button {
	position: absolute;
	top: 0;
	height: 100%;
}

.left .button {
	left: 0;
}

.right .button {
	right: 0;
}
</style>

<script lang="ts" setup>
import {ref, watch} from 'vue'
import {ElIcon} from "element-plus";
import {CaretRight, CaretBottom, CaretLeft} from "@element-plus/icons-vue";
import {ElCollapseTransition} from 'element-plus'

interface DetailProps {
	open?: boolean,
	disabled?: boolean,
	position?: "left" | "right",
	buttonSize?: string,
}

const props = withDefaults(defineProps<DetailProps>(), {
	position: "left",
	buttonSize: "1em",
	disabled: false
})

interface DetailsEmits {
	(event: "open"): void
	(event: "close"): void
}

const emits = defineEmits<DetailsEmits>()

const openState = ref(false)

watch(() => props.open, (newValue) => {
	openState.value = newValue
}, {immediate: true})

const handleToggle = () => {
	openState.value = !openState.value
}

watch(() => openState.value, (value) => {
	if (value) {
		emits("open")
	} else {
		emits("close")
	}
})
</script>