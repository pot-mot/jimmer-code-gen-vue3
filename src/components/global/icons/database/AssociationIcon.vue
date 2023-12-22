<script lang="ts" setup>
import {ElIcon} from "element-plus";
import {AssociationType} from "@/api/__generated/model/enums";

interface AssociationIconProps {
	associationType: AssociationType,
	fake: boolean,
}

defineProps<AssociationIconProps>()
</script>

<template>
	<el-icon size="1.3em" style="transform: translateY(0.1em)">
		<svg fill="none" stroke="#666" stroke-linecap="round"
			 stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

			<path v-if="fake" d="M2 12h7M2 22h-7"/>
			<path v-else d="M2 12h22"></path>

			<path v-if="associationType == 'MANY_TO_MANY' || associationType == 'MANY_TO_ONE'" d="M10 12l-7 -5M10 12l-7 5"/>

			<path v-if="associationType == 'ONE_TO_MANY' || associationType == 'MANY_TO_MANY'" d="M14 12l7 -5M14 12l7 5"/>
		</svg>
	</el-icon>
</template>
