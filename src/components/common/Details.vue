<template>
	<div v-if="disabled">
		<slot name="title"></slot>
	</div>
	<el-collapse v-else :model-value="activeNames">
		<el-collapse-item :name="NAME">
			<template #title>
				<slot name="title"></slot>
			</template>
			<slot></slot>
		</el-collapse-item>
	</el-collapse>
</template>

<script lang="ts" setup>
import {computed, ComputedRef} from "vue";
import {ElCollapse, ElCollapseItem} from "element-plus";

interface DetailProps {
	open?: boolean,
	disabled?: boolean,
}

const props = defineProps<DetailProps>()

const NAME = "NAME"

const activeNames: ComputedRef<string[]> = computed(() => {
	if (props.open) {
		return [NAME]
	} else {
		return []
	}
})
</script>

<style scoped>
.el-collapse,
:deep(.el-collapse),
:deep(.el-collapse-item__header),
:deep(.el-collapse-item__wrap) {
	border: none;
}

.el-collapse,
:deep(.el-collapse),
:deep(.el-collapse-item__header) {
	height: unset;
}

:deep(.el-collapse-item__content) {
	padding: 0;
}
</style>