<script setup lang="ts">
const props = withDefaults(defineProps<{
	span?: string
}>(), {
	span: "1fr"
})

defineExpose({
	span: props.span
})
</script>

<template>
	<div class="line-item">
		<slot></slot>
	</div>
</template>
