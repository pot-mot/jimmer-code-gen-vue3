<template>
	<div id="ModelEditor" ref="wrapper" class="wrapper">
		<div ref="container"></div>
	</div>
</template>

<style scoped>
@import "../../assets/graph-common.css";
</style>

<script setup lang="ts">
import {useModelEditorGraphStore} from "./store/ModelEditorGraphStore.ts";

const store = useModelEditorGraphStore()


</script>