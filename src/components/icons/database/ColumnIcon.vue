<script setup lang="ts">
import {ElIcon, ElTooltip} from "element-plus";
import {GenColumnCommonView} from "../../../api/__generated/model/static";

interface DataSourceIconProps {
	column: Partial<GenColumnCommonView>
}

defineProps<DataSourceIconProps>()
</script>

<template>
	<el-tooltip effect="light" trigger="click" :disabled="
	!column.partOfPk && !column.partOfFk && !column.partOfUniqueIdx
	&& !column.notNull && !column.autoIncrement
">
		<el-icon size="1.2em" style="transform: translateY(0.2em)">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 26 26"
				 fill="none"
				 stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">

				<path d="M3 3m0 1a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1h-16a1 1 0 01-1-1zm6-1v18"
					  stroke="#aaa"/>

				<path v-if="column.notNull"
					  d="M4 16a3 3 0 110 6 3 3 0 110-6"
					  stroke="#aaa"/>

				<path v-if="column.partOfUniqueIdx"
					  d="M4 4l4 2M4 8l4 2M4 12l4 2"
					  stroke="#aaa"/>

				<!-- https://tablericons.com/ key -->
				<path v-if="column.partOfFk || column.partOfPk"
					  d="M 15 14 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 m 3 3 l 0 6 l 3 0 m -3 -3 l 2 0"
					  :stroke="column.partOfFk ? '#409EFF' : '#E6A23C'" fill="none"/>

				<path v-if="column.autoIncrement"
					  d="M 21 12 v -4 m -2 2 h 4"
					  :stroke="column.partOfFk ? '#409EFF' : '#E6A23C'" fill="none"/>

			</svg>
		</el-icon>

		<template #content>
			<div v-if="column.partOfPk">PK</div>
			<div v-if="column.autoIncrement">AUTO INCREMENT</div>
			<div v-if="column.notNull">NOT NULL</div>
			<div v-if="column.partOfUniqueIdx">UNIQUE</div>
			<div v-if="column.partOfFk">FK</div>
		</template>
	</el-tooltip>
</template>

<style scoped>

</style>