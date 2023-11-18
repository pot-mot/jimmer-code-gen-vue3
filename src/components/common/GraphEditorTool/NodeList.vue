<script setup lang="ts">
import {Node} from '@antv/x6'

interface NodeListProps {
	nodes: Node[]
}

defineProps<NodeListProps>()
</script>

<template>
	<template v-for="node in nodes">
		<slot :node="node"></slot>
	</template>
</template>