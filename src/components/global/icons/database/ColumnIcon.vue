<script lang="ts" setup>
import {ElIcon, ElTooltip} from "element-plus";
import {GenColumnCommonView} from "@/api/__generated/model/static";

interface DataSourceIconProps {
	column: Partial<GenColumnCommonView>
}

defineProps<DataSourceIconProps>()
</script>

<template>
	<el-tooltip :disabled="
	!column.partOfPk && !column.partOfFk && !column.partOfUniqueIdx
	&& !column.typeNotNull && !column.autoIncrement
" effect="light" trigger="click">
		<el-icon size="1.2em" style="transform: translateY(0.2em)">
			<svg fill="none" stroke-linecap="round"
				 stroke-linejoin="round"
				 stroke-width="1.5" viewBox="-2 -2 26 26" xmlns="http://www.w3.org/2000/svg">

				<path d="M3 3m0 1a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1h-16a1 1 0 01-1-1zm6-1v18"
					  stroke="#aaa"/>

				<path v-if="column.typeNotNull"
					  d="M4 16a3 3 0 110 6 3 3 0 110-6"
					  stroke="#aaa"/>

				<path v-if="column.partOfUniqueIdx"
					  d="M4 4l4 2M4 8l4 2M4 12l4 2"
					  stroke="#aaa"/>

				<!-- https://tablericons.com/ key -->
				<path v-if="column.partOfFk || column.partOfPk"
					  :stroke="column.partOfFk ? '#409EFF' : '#E6A23C'"
					  d="M 15 14 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 m 3 3 l 0 6 l 3 0 m -3 -3 l 2 0" fill="none"/>

				<path v-if="column.autoIncrement"
					  :stroke="column.partOfFk ? '#409EFF' : '#E6A23C'"
					  d="M 20 10 v -6 m -3 3 h 6" fill="none"/>

			</svg>
		</el-icon>

		<template #content>
			<div v-if="column.partOfPk">PK</div>
			<div v-if="column.autoIncrement">AUTO INCREMENT</div>
			<div v-if="column.typeNotNull">NOT NULL</div>
			<div v-if="column.partOfUniqueIdx">UNIQUE</div>
			<div v-if="column.partOfFk">FK</div>
		</template>
	</el-tooltip>
</template>

<style scoped>

</style>