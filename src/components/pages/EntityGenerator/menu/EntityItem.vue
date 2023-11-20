<script lang="ts" setup>
import {PackageMenuEventBus} from "./PackageMenuEventBus.ts";
import Comment from "@/components/global/common/Comment.vue";

interface EntityItemProps {
	entity: { id: number, name: string, comment: string }
}

defineProps<EntityItemProps>()
</script>

<template>
	<div style="line-height: 1.5em">
		<el-text draggable="true"
				 @dragend="PackageMenuEventBus.emit('dragEnd')"
				 @dragstart="PackageMenuEventBus.emit('dragStart', {id: entity.id, type: 'Entity'})">
			{{ entity.name }}
			<Comment :comment="entity.comment"></Comment>
		</el-text>
	</div>
</template>

<style scoped>

</style>