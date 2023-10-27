<script setup lang="ts">
import {PackageMenuEventBus} from "../eventBus/PackageMenuEventBus.ts";
import Comment from "../../common/Comment.vue";

interface EntityItemProps {
	entity: {id: number, name: string, comment: string}
}

defineProps<EntityItemProps>()
</script>

<template>
	<div style="line-height: 1.5em">
		<el-text draggable="true"
				 @dragstart="PackageMenuEventBus.emit('dragStart', {id: entity.id, type: 'Entity'})"
				 @dragend="PackageMenuEventBus.emit('dragEnd')">
			{{ entity.name }}
			<Comment :comment="entity.comment"></Comment>
		</el-text>
	</div>
</template>

<style scoped>

</style>