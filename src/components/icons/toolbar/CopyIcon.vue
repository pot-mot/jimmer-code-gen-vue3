<script setup lang="ts">
defineProps<{
	finish: boolean
}>()
</script>

<template>
	<el-icon size="1.5em">
		<!-- https://tablericons.com/ clipboard -->
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5"
			 stroke="#ccc" fill="none" stroke-linecap="round" stroke-linejoin="round">
			<path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
			<path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />

			<path v-if="finish" d="M9 14l2 2l4 -4" />
		</svg>
	</el-icon>
</template>

<style scoped>

</style>