<template>
	<div>
		<div :class="position" :style="{paddingLeft: position === 'left' ? `calc(3px + ${buttonSize})` : 0}"
			 class="title">
			<slot name="title"/>
			<div v-if="!disabled" :style="{width: buttonSize}" class="button"
				 @click="handleToggle">
				<slot name="button">
					<el-icon :size="buttonSize" style="display: inline;">
						<CaretRight v-if="!openState && position === 'left'"/>
						<CaretLeft v-else-if="!openState && position === 'right'"/>
						<CaretBottom v-else/>
					</el-icon>
				</slot>
			</div>
		</div>
		<el-collapse-transition v-if="!disabled">
			<div
				v-show="openState"
				:style="{paddingLeft: position === 'left' ? `calc(3px + ${buttonSize})` : ``}"
				class="content">
				<slot/>
			</div>
		</el-collapse-transition>
	</div>
</template>

<style scoped>
.title {
	position: relative;
}

.button {
	position: absolute;
	top: 0;
	height: 100%;
	display: flex;
	align-items: center;
	cursor: pointer;
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
import {ElCollapseTransition, ElIcon} from "element-plus";
import {CaretBottom, CaretLeft, CaretRight} from "@element-plus/icons-vue";

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
}, {immediate: true})
</script>
