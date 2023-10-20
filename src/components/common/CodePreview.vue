<template>
	<pre v-text="code.trim()" style="padding-bottom: 2em; scrollbar-gutter: stable; height: 100%; width: 100%; overflow: auto;"></pre>
</template>

<script setup lang="ts">
interface CodePreviewProps {
	code: string
}

defineProps<CodePreviewProps>()
</script>