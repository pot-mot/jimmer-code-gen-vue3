<template>
	<div class="node" v-if="table">
		<div>
			{{table.name}}
		</div>
		<div v-for="column in table.columns">
			{{ column.name }} {{column.type}} {{column.comment}}
		</div>
	</div>
</template>

<script setup lang='ts'>
import {inject, onMounted, ref} from "vue";
import {GenTableColumnsView} from "../../api/__generated/model/static";

const getNode: Function | undefined = inject<Function>("getNode");

const table = ref<GenTableColumnsView>()

onMounted(() => {
	table.value = getNode?.()?.getData()
});
</script>

<style scoped>
.node {
	border: 1px solid #ccc;
	min-width: 300px;
}
</style>
