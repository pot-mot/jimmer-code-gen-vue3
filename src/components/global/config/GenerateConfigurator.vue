<script lang="ts" setup>
import DragDialog from "@/components/global/DragDialog/DragDialog.vue";
import {ref} from "vue";
import {Tools} from "@element-plus/icons-vue"
import GenerateConfigForm from "@/components/global/config/GenerateConfigForm.vue";
import TypeMappingsTable from "@/components/global/config/TypeMappingsTable.vue";

const openState = ref(false)

const configType = ref<'GenerateConfigForm' | 'TypeMappingsTable' | undefined>()
</script>

<template>
	<div class="button">
		<el-popover placement="top-end">
			<template #reference>
				<el-button link>
					<el-icon size="2em">
						<Tools @click="openState = true; configType = 'GenerateConfigForm'"></Tools>
					</el-icon>
				</el-button>
			</template>

			<ul>
				<li>
					<el-button link @click="openState = true; configType = 'GenerateConfigForm'">全局生成配置
					</el-button>
				</li>
				<li>
					<el-button link @click="openState = true; configType = 'TypeMappingsTable'">类型映射配置</el-button>
				</li>
			</ul>
		</el-popover>

	</div>

	<DragDialog v-if="openState" :init-w="900" :init-y="100" can-resize @close="openState = false">
		<div class="wrapper">
			<GenerateConfigForm v-if="configType == 'GenerateConfigForm'" @cancel="openState = false"
								@submit="openState = false"></GenerateConfigForm>

			<TypeMappingsTable v-else-if="configType == 'TypeMappingsTable'"></TypeMappingsTable>
		</div>
	</DragDialog>
</template>

<style scoped>
.wrapper {
	height: 100%;
	width: 100%;
	overflow: auto;
	scrollbar-gutter: stable;
}

.button {
	position: fixed;
	left: 0.5em;
	bottom: 0.5em;
}
</style>