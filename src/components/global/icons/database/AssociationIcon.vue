<script lang="ts" setup>
import {ElIcon} from "element-plus";
import {AssociationType} from "@/api/__generated/model/enums";

interface AssociationIconProps {
	type: AssociationType,
	fake: boolean,
}

defineProps<AssociationIconProps>()
</script>

<template>
	<el-icon size="1em">
		<svg fill="none" :stroke="fake ? '#999' : '#666'" stroke-linecap="round"
			 stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

			<path d="M2 12h22"></path>

			<path v-if="type == 'MANY_TO_MANY' || type == 'MANY_TO_ONE'" d="M10 12l-7 -5M10 12l-7 5"/>

			<path v-if="type == 'ONE_TO_MANY' || type == 'MANY_TO_MANY'" d="M14 12l7 -5M14 12l7 5"/>
		</svg>
	</el-icon>
</template>
