<script setup lang="ts">
import {Edge} from '@antv/x6'
import {useModelEditorStore} from "../store/ModelEditorStore.ts";

interface EdgeItem {
	edge: Edge
}

defineProps<EdgeItem>()

const store = useModelEditorStore()
</script>

<template>
	<el-button @click="store.focus(edge)">
		{{ edge }}
	</el-button>
</template>

<style scoped>

</style>