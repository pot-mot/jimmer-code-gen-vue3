<script setup lang="ts">
import {Edge} from '@antv/x6'
import {useModelEditorGraphStore} from "../store/ModelEditorGraphStore.ts";

interface EdgeItem {
	edge: Edge
}

defineProps<EdgeItem>()

const store = useModelEditorGraphStore()
</script>

<template>
	<el-button @click="store.focus(edge)">
		{{ edge }}
	</el-button>
</template>

<style scoped>

</style>