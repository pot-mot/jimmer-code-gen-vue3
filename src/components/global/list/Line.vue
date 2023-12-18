<script setup lang="ts">
import {ref, watch} from "vue";
import LineItem from "@/components/global/list/LineItem.vue";
import {LineProps} from "@/components/global/list/ListProps.ts";

const props = withDefaults(defineProps<LineProps>(), {
	gap: '0.2em',
	height: '2em'
})

const slots = defineSlots<{
	default(props: {}): any,
	[key: string]: (props: {span: string}) => any
}>()

const spans = ref(<string[]>[])

const gridTemplateColumns = ref("")

const setSpansAndTemplateColumns = () => {
	spans.value = []

	slots.default({}).forEach((item: any) => {
		if (item.type.__name == "LineItem") {
			const span = item.props?.span ? item.props.span : item.type.props.span.default
			if (span) spans.value.push(span)
		} else if (item.type.toString() == "Symbol(v-fgt)") {
			item.children.forEach((item: any) => {
				if (item.type.__name == "LineItem") {
					const span = item.props?.span ? item.props.span : item.type.props.span.default
					if (span) spans.value.push(span)
				}
			})
		}
	})

	gridTemplateColumns.value = spans.value.join(" ")
}

watch(() => props, () => {
	setSpansAndTemplateColumns()
}, {immediate: true, deep: true})
</script>

<template>
	<div class="line-container" :style="{gridTemplateColumns, gridColumnGap: gap, height, lineHeight: height}">
		<slot>
			<LineItem v-for="item in items" :span="item.span">
				<slot :name="item.name" :span="item.span"></slot>
			</LineItem>
		</slot>
	</div>
</template>

<style scoped>
.line-container {
	display: grid;
	white-space: nowrap;
}
</style>
