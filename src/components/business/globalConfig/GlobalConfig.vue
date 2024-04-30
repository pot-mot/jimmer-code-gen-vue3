<script lang="ts" setup>
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import {ref} from "vue";
import {Tools} from "@element-plus/icons-vue"
import TypeMappingForm from "@/components/business/typeMapping/TypeMappingForm.vue";
import ColumnDefaultForm from "@/components/business/columnDefault/ColumnDefaultForm.vue";
import DebugForm from "@/debug/DebugForm.vue";
import GlobalGenConfigForm from "@/components/business/genConfig/GlobalGenConfigForm.vue";

const globalConfigOptions = ref([
	{
		name: 'GlobalGenConfigForm',
		label: '全局生成配置',
		modal: true,
		openState: false,
	},
	{
		name: 'TypeMappingForm',
		label: '类型映射配置',
		modal: true,
		openState: false,
	},
	{
		name: 'ColumnDefaultForm',
		label: '列默认配置',
		modal: true,
		openState: false,
	},
	{
		name: 'DebugForm',
		label: 'Debug 日志',
		modal: false,
		openState: false,
	}
])
</script>

<template>
	<div class="button">
		<el-popover placement="top-end">
			<template #reference>
				<el-button link>
					<el-icon size="2em">
						<Tools></Tools>
					</el-icon>
				</el-button>
			</template>

			<ul>
				<li v-for="option in globalConfigOptions">
					<el-button link @click="option.openState = true">{{ option.label }}
					</el-button>
				</li>
			</ul>
		</el-popover>
	</div>

	<template v-for="option in globalConfigOptions" :key="option.name">
		<DragDialog v-model="option.openState" :init-w="900" :init-y="100" :init-h="630" can-resize :modal="option.modal">
			<h3 style="padding-bottom: 20px; text-align: center;">
				{{ option.label }}
			</h3>
			<div style="width: calc(100% - 1em); padding-left: 0.5em;">
				<GlobalGenConfigForm
					v-if="option.name === 'GlobalGenConfigForm'"
					@cancel="option.openState = false"
					@submit="option.openState = false"></GlobalGenConfigForm>
				<TypeMappingForm
					v-else-if="option.name === 'TypeMappingForm'"></TypeMappingForm>
				<ColumnDefaultForm
					v-else-if="option.name === 'ColumnDefaultForm'"></ColumnDefaultForm>
				<DebugForm
					v-else-if="option.name === 'DebugForm'"></DebugForm>
			</div>
		</DragDialog>
	</template>
</template>

<style scoped>
.button {
	position: fixed;
	left: 0.5em;
	bottom: 0.5em;
}
</style>
