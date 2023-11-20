<script lang="ts" setup>
import {PackageMenuEventBus} from "./PackageMenuEventBus.ts";
import Comment from "@/components/global/common/Comment.vue";

interface EnumItemProps {
	genEnum: { id: number, name: string, comment: string }
}

defineProps<EnumItemProps>()
</script>

<template>
	<div style="line-height: 1.5em">
		<el-text draggable="true"
				 @dragend="PackageMenuEventBus.emit('dragEnd')"
				 @dragstart="PackageMenuEventBus.emit('dragStart', {id: genEnum.id, type: 'Enum'})">
			{{ genEnum.name }}
			<Comment :comment="genEnum.comment"></Comment>
		</el-text>
	</div>
</template>

<style scoped>

</style>