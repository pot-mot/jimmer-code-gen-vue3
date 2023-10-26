<script setup lang="ts">
import {PackageMenuEventBus} from "../eventBus/PackageMenuEventBus.ts";

interface EnumItemProps {
	genEnum: { id: number, name: string }
}

defineProps<EnumItemProps>()
</script>

<template>
	<div style="line-height: 1.5em">
		<el-text draggable="true"
				 @dragstart="PackageMenuEventBus.emit('dragStart', {id: genEnum.id, type: 'Enum'})"
				 @dragend="PackageMenuEventBus.emit('dragEnd')">
			{{ genEnum.name }}
		</el-text>
	</div>
</template>

<style scoped>

</style>