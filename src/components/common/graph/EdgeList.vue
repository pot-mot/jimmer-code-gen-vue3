<script setup lang="ts">
import {Edge} from '@antv/x6'

interface EdgeListProps {
	edges: Edge[]
}

defineProps<EdgeListProps>()
</script>

<template>
	<template v-for="edge in edges">
		<slot :edge="edge"></slot>
	</template>
</template>