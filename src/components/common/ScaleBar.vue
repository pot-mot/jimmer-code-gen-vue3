<script setup lang="ts">
import {Graph} from "@antv/x6";
import {Minus, Plus} from "@element-plus/icons-vue";
import {computed, nextTick, onMounted, ref, watch} from "vue";
import {defaultZoomRange} from "../AssociationEditor/constant.ts";

interface ScaleBarProps {
	graph: Graph,
	initScaling?: number,
	min?: number,
	max?: number,
}

const props = defineProps<ScaleBarProps>()

const scaling = ref(1)

const min = ref(Math.log2(defaultZoomRange.minScale))

const max = ref(Math.log2(defaultZoomRange.maxScale))

onMounted(() => {
	nextTick(() => {
		if (props.initScaling) {
			scaling.value = props.initScaling
			props.graph.zoomTo(props.initScaling)
		} else {
			scaling.value = props.graph.scale().sx
		}

		if (props.min) {
			min.value = props.min
		}
		if (props.max) {
			max.value = props.max
		}

		watch(() => scaling.value, (factor) => {
			props.graph.zoomTo(factor)
		})

		props.graph.on('scale', ({sx}) => {
			if (sx != scaling.value) {
				scaling.value = sx
			}
		})
	})
})

const formatScaling = computed<number>({
	set(newValue) {
		scaling.value = Math.pow(2, newValue)
	},
	get() {
		return Math.log2(scaling.value)
	}
})

const inputModelValue = ref("")

const parseInputModelValue = (value: string) => {
	scaling.value = parseFloat(value) / 100
}
</script>

<template>
	<div class="scale-bar">
		<div>
			<el-popover trigger="click">
				<template #reference>
					{{ (scaling * 100).toFixed(2) }} %
				</template>
				<el-input v-model="inputModelValue" @change="parseInputModelValue">
					<template #suffix>%</template>
				</el-input>
			</el-popover>
		</div>
		<div style="text-align: center; transform: translateY(-0.2em)">
			<el-button :icon="Minus" link @click="formatScaling -= 0.25"></el-button>
		</div>
		<div>
			<el-slider
				v-model="formatScaling"
				:step="0.25"
				:min="min"
				:max="max"
				:show-tooltip="false"
				style="height: 100%;">
			</el-slider>
		</div>
		<div style="text-align: center; transform: translateY(-0.2em)">
			<el-button :icon="Plus" link @click="formatScaling += 0.25"></el-button>
		</div>
	</div>
</template>

<style scoped>
.scale-bar {
	display: grid;
	grid-template-columns: 6em 3em 1fr 3em;
	line-height: 2em;
	height: 2em;
}
</style>