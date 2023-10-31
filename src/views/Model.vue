<script setup lang="ts">
import LeftTopBottomLayout from "../components/layout/LeftRightLayout.vue";
import ModelEditor from "../components/ModelEditor/index.vue";
</script>

<template>
	<LeftTopBottomLayout>
		<template #left>

		</template>
		<template #right>
			<ModelEditor></ModelEditor>
		</template>
	</LeftTopBottomLayout>
</template>

<style scoped>

</style>