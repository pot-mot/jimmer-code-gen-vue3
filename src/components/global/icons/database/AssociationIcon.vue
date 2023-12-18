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
	<el-icon size="1.3em" style="transform: translateY(0.25em)">
		<svg fill="none" :stroke="fake ? '#666' : '#409EFF'" stroke-linecap="round"
			 stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

			<template v-if="associationType == 'MANY_TO_MANY' || associationType == 'MANY_TO_ONE'">
				<path d="M1 2h7v6h-7zM1 14h7v6h-7z"/>
				<path d="M12 12l-4 -4"/>
				<path d="M12 12l-4 4"/>
			</template>
			<template v-else>
				<path d="M1 8h7v6h-7z"/>
				<path d="M12 12h-4"/>
			</template>

			<template v-if="associationType == 'ONE_TO_MANY' || associationType == 'MANY_TO_MANY'">
				<path d="M16 2h7v6h-7zM16 14h7v6h-7z"/>
				<path d="M12 12l4 -4"/>
				<path d="M12 12l4 4"/>
			</template>
			<template v-else>
				<path d="M16 8h7v6h-7z"/>
				<path d="M12 12h4"/>
			</template>
		</svg>
	</el-icon>
</template>
