<script setup lang="ts">
import {ElIcon, ElTooltip} from "element-plus";
import {GenColumnCommonView} from "../../../api/__generated/model/static";

interface DataSourceIconProps {
	column: Partial<GenColumnCommonView>
}

defineProps<DataSourceIconProps>()
</script>

<template>
	<el-tooltip effect="light" :disabled="
	!column.partOfPk && !column.partOfFk && !column.partOfUniqueIdx
	&& !column.notNull && !column.autoIncrement
">
		<el-icon size="1.2em" style="transform: translateY(0.2em)">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
				 fill="none"
				 stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">

				<path v-if="column.notNull"
					  d="M12 3a9 9 0 110 18 9 9 0 110-18"
					  stroke="#aaa"/>

				<path v-if="column.partOfUniqueIdx"
					  d="M4 4 L 20 20"
					  stroke="#aaa"/>

				<!-- https://tablericons.com/ key -->
				<path v-if="column.partOfFk || column.partOfPk"
					  d="m7 16a4 4 0 108 0 4 4 0 10-8 0m4-4 0-8 3 0m-3 3 3 0"
					  :stroke="column.partOfFk ? '#409EFF' : '#E6A23C'" fill="none"/>

				<path v-if="column.autoIncrement"
					  d="M18 12V8M16 10H20"
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