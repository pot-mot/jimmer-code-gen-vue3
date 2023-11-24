<script lang="ts" setup>
import PackageMenu from "../../business/package/menu/PackageMenu.vue";
import LeftRightLayout from "@/components/global/layout/LeftRightLayout.vue";
</script>

<template>
	<LeftRightLayout>
		<template #left>
			<PackageMenu></PackageMenu>
		</template>
		<template #right>

		</template>
	</LeftRightLayout>
</template>