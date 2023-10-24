<script setup lang="ts">
import {onMounted, ref} from "vue";
import {api} from "../../api";
import {GenEntityPropertiesView} from "../../api/__generated/model/static";
import EntityInfo from "./entity/EntityInfo.vue";

const entities = ref<GenEntityPropertiesView[]>()

const getData = async () => {
	entities.value = await api.entityService.query({query: {}})
}

onMounted(() => {
	getData()
})
</script>

<template>
	<div class="wrapper">
		<div v-for="entity in entities">
			<EntityInfo :entity="entity"></EntityInfo>
		</div>
	</div>
</template>

<style scoped>
.wrapper {
	height: 100%;
	overflow: auto;
}
</style>