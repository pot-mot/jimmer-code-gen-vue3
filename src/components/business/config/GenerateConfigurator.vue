<script lang="ts" setup>
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import {ref} from "vue";
import {Tools} from "@element-plus/icons-vue"
import GenerateConfigForm from "@/components/business/config/GenerateConfigForm.vue";
import TypeMappingsEditor from "@/components/business/config/TypeMappingsEditor.vue";

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

	<DragDialog v-model="openState" :init-w="900" :init-y="100" :init-h="600" can-resize>
		<div style="width: calc(100% - 1em)">
			<GenerateConfigForm v-if="configType == 'GenerateConfigForm'"
								@cancel="openState = false" @submit="openState = false"></GenerateConfigForm>
			<TypeMappingsEditor v-else-if="configType == 'TypeMappingsTable'"></TypeMappingsEditor>
		</div>
	</DragDialog>
</template>

<style scoped>
.button {
	position: fixed;
	left: 0.5em;
	bottom: 0.5em;
}
</style>