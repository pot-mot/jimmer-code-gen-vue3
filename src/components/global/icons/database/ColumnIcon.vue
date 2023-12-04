<script lang="ts" setup>
import {ElIcon, ElTooltip} from "element-plus";
import {GenColumnCommonView} from "@/api/__generated/model/static";
import {computed} from "vue";

interface DataSourceIconProps {
	column: Partial<GenColumnCommonView>
}

const props = defineProps<DataSourceIconProps>()

const columnColor = {
	PK: '#E6A23C',
	FK: '#409EFF',
	BUSINESS_KEY: '#ff5d40',
	COMMON: '#888'
}

const lineColor = computed(() => {
	if (props.column.partOfPk) {
		return columnColor.PK
	} else if (props.column.partOfFk) {
		return columnColor.FK
	} else if (props.column.businessKey) {
		return columnColor.BUSINESS_KEY
	} else {
		return columnColor.COMMON
	}
})
</script>

<template>
	<el-tooltip :disabled="
	!column.partOfPk && !column.partOfFk && !column.partOfUniqueIdx
	&& !column.typeNotNull && !column.autoIncrement
" effect="light" trigger="click">
		<el-icon size="1.2em" style="transform: translateY(0.2em)">
			<svg fill="none" stroke-linecap="round"
				 stroke-linejoin="round"
				 stroke-width="1.5" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">

				<path d="M3 3m0 1a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1h-16a1 1 0 01-1-1zm6-1v18"
					  :stroke="lineColor"/>

				<path v-if="column.typeNotNull"
					  d="M4 16a3 3 0 110 6 3 3 0 110-6"
					  :stroke="lineColor"/>

				<path v-if="column.partOfUniqueIdx"
					  d="M4 4l4 2M4 8l4 2M4 12l4 2"
					  :stroke="lineColor"/>

				<!-- https://tablericons.com/ key -->
				<path v-if="column.partOfFk || column.partOfPk"
					  :stroke="lineColor"
					  d="M 15 14 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 m 3 3 l 0 6 l 3 0 m -3 -3 l 2 0" fill="none"/>

				<path v-if="column.partOfPk && column.autoIncrement"
					  :stroke="columnColor.COMMON"
					  d="M 20 10 v -6 m -3 3 h 6" fill="none"/>

			</svg>
		</el-icon>

		<template #content>
			<div v-if="column.partOfPk">PK</div>
			<div v-if="column.autoIncrement">AUTO INCREMENT</div>
			<div v-if="column.typeNotNull">NOT NULL</div>
			<div v-if="column.partOfUniqueIdx">UNIQUE</div>
			<div v-if="column.partOfFk">FK</div>
			<div v-if="column.businessKey">BUSINESS KEY</div>
		</template>
	</el-tooltip>
</template>