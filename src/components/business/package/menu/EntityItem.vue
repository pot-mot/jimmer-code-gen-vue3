<script lang="ts" setup>
import Comment from "@/components/global/common/Comment.vue";
import {PackageMenuEventsProps} from "@/components/business/package/menu/PackageMenuEvents.ts";

interface EntityItemProps {
	entity: { id: number, name: string, comment: string }
}

defineProps<EntityItemProps & PackageMenuEventsProps>()
</script>

<template>
	<div style="line-height: 1.5em">
		<el-text draggable="true"
				 @dragend="eventBus.emit('dragEnd')"
				 @dragstart="eventBus.emit('dragStart', {id: entity.id, type: 'Entity'})">
			{{ entity.name }}
			<Comment :comment="entity.comment"></Comment>
		</el-text>
	</div>
</template>