<script lang="ts" setup>
import {ElIcon} from "element-plus";
import {TableType} from "@/api/__generated/model/enums";

interface TableIconProps {
	type?: TableType
}

defineProps<TableIconProps>()
</script>

<template>
	<el-icon size="1.3em" style="transform: translateY(0.2em)">
		<template v-if="!type || type === 'TABLE'">
			<!-- https://tablericons.com/ table-->
			<svg fill="none" stroke="#2c3e50" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
				 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z"/>
				<path d="M3 10h18"/>
				<path d="M10 3v18"/>
			</svg>
		</template>
		<template v-if="type === 'SUPER_TABLE'">
			<!-- https://tablericons.com/ table-->
			<svg fill="none" stroke="#2c3e50" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
				 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path d="M3 5a2 2 0 012-2h5m4 0h5a2 2 0 012 2v5m0 4v5a2 2 0 01-2 2h-5m-4 0h-5a2 2 0 01-2-2v-5m0-4v-5zM3 10h14M10 3v13"/>
			</svg>
		</template>
		<template v-else-if="type === 'ALIAS'">
			<!-- https://tablericons.com/ link-->
			<svg fill="none" stroke="#2c3e50" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
				 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path d="M9 15l6 -6"/>
				<path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464"/>
				<path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463"/>
			</svg>
		</template>
		<template v-else-if="type === 'VIEW'">
			<!-- https://tablericons.com/ eyeglass-->
			<svg fill="none" stroke="#2c3e50" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
				 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path d="M8 4h-2l-3 10v2.5"/>
				<path d="M16 4h2l3 10v2.5"/>
				<path d="M10 16l4 0"/>
				<path d="M17.5 16.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0"/>
				<path d="M6.5 16.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0"/>
			</svg>
		</template>
	</el-icon>
</template>
