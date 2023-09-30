<script setup lang="ts">
import {GenEntityPropertiesView} from "../../../api/__generated/model/static";

interface EntityInfoProps {
	entity: GenEntityPropertiesView
}

const props = defineProps<EntityInfoProps>()

</script>

<template>
	<div>
		<div>{{ entity.name }}</div>
		<div>{{ entity.comment }}</div>
		<table v-for="property in entity.properties">
			<tr>
				<td>{{ property.annotationExpression }}</td>
			</tr>
			<tr>
				<td>{{ property.name }}</td>
				<td>{{ property.type }}</td>
				<td>{{ property.key }}</td>
				<td>{{ property.id }}</td>
				<td>{{ property.comment }}</td>
			</tr>
		</table>
	</div>
</template>

<style scoped>

</style>