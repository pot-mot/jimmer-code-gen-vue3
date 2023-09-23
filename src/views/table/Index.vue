<script lang="ts" setup>
import LeftTopBottomLayout from "../../components/layout/LeftRightLayout.vue";
import DataSourceMenu from "../../components/dataSource/DataSourceMenu.vue";</script>

<template>
	<LeftTopBottomLayout>
		<template #left>
			<DataSourceMenu></DataSourceMenu>
		</template>
		<template #right>
			<RouterView></RouterView>
		</template>
	</LeftTopBottomLayout>
</template>