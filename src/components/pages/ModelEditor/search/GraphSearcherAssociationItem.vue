<script setup lang="ts">
import {GenAssociationModelInput} from "@/api/__generated/model/static";

const props = defineProps<{
	association: GenAssociationModelInput,
	associationKeywords: string[],
}>()
</script>

<template>
	<div>
		<el-text>{{ association.name }}</el-text>
	</div>
</template>
