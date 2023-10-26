<script lang="ts" setup>
import LeftTopBottomLayout from "../components/layout/LeftRightLayout.vue"
import EntityGenerator from "../components/EntityGenerator/index.vue"
import PackageMenu from "../components/EntityGenerator/menu/PackageMenu.vue";
</script>

<template>
	<LeftTopBottomLayout>
		<template #left>
			<PackageMenu></PackageMenu>
		</template>
		<template #right>
			<EntityGenerator></EntityGenerator>
		</template>
	</LeftTopBottomLayout>
</template>

<style scoped>

</style>