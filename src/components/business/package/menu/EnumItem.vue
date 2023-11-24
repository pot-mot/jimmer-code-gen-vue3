<script lang="ts" setup>
import Comment from "@/components/global/common/Comment.vue";
import {PackageMenuEventsProps} from "@/components/business/package/menu/PackageMenuEvents.ts";

interface EnumItemProps {
	genEnum: { id: number, name: string, comment: string }
}

defineProps<EnumItemProps & PackageMenuEventsProps>()
</script>

<template>
	<div style="line-height: 1.5em">
		<el-text draggable="true"
				 @dragend="eventBus.emit('dragEnd')"
				 @dragstart="eventBus.emit('dragStart', {id: genEnum.id, type: 'Enum'})">
			{{ genEnum.name }}
			<Comment :comment="genEnum.comment"></Comment>
		</el-text>
	</div>
</template>

<style scoped>

</style>