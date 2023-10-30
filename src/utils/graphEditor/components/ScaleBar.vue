<script setup lang="ts">
import {Graph} from "@antv/x6";
import {Minus, Plus} from "@element-plus/icons-vue";
import {defaultZoomRange} from "../../../components/AssociationEditor/constant.ts";
import {computed, nextTick, onMounted, ref, watch} from "vue";
interface ScaleBarProps {
	graph: Graph,
	initScaling: number
}

const props = defineProps<ScaleBarProps>()

const scaling = ref(1)

onMounted(() => {
	nextTick(() => {
		scaling.value = props.initScaling

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

</script>

<template>
	<div class="scale-bar">
		<div>
			{{ (scaling * 100).toFixed(2) }}%
		</div>
		<div style="text-align: center;">
			<el-button :icon="Minus" link @click="formatScaling -= 0.25"></el-button>
		</div>
		<div>
			<el-slider v-model="formatScaling"
					   :step="0.25"
					   :min="Math.log2(defaultZoomRange.minScale)"
					   :max="Math.log2(defaultZoomRange.maxScale)"
					   :show-tooltip="false">
			</el-slider>
		</div>
		<div style="text-align: center;">
			<el-button :icon="Plus" link @click="formatScaling += 0.25"></el-button>
		</div>
	</div>
</template>

<style scoped>
.scale-bar {
	display: grid; grid-template-columns: 4em 3em 1fr 3em; line-height: 2em; height: 2em;
}
</style>