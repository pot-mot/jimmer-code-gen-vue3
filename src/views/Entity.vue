<script lang="ts" setup>
import LeftTopBottomLayout from "../components/layout/LeftRightLayout.vue"
import EntityGenerator from "../components/EntityGenerator/index.vue"

</script>

<template>
	<LeftTopBottomLayout>
		<template #left>
		</template>
		<template #right>
			<EntityGenerator></EntityGenerator>
		</template>
	</LeftTopBottomLayout>
</template>

<style scoped>

</style>