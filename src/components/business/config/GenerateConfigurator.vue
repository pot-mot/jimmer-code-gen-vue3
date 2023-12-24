<script lang="ts" setup>
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import {ref} from "vue";
import {Tools} from "@element-plus/icons-vue"
import GenerateConfigForm from "@/components/business/config/GenConfigForm.vue";
import TypeMappingsEditor from "@/components/business/config/TypeMappingsEditor.vue";
import ColumnDefaultEditor from "@/components/business/config/ColumnDefaultEditor.vue";
import {GenerateConfiguratorOption, GenerateConfiguratorOptions} from "@/components/business/config/constant.ts";

const openState = ref(false)

const configType = ref<GenerateConfiguratorOption | undefined>()
</script>

<template>
	<div class="button">
		<el-popover placement="top-end">
			<template #reference>
				<el-button link>
					<el-icon size="2em"><Tools></Tools></el-icon>
				</el-button>
			</template>

			<ul>
				<li v-for="option in GenerateConfiguratorOptions">
					<el-button link @click="openState = true; configType = option.name">{{ option.label }}
					</el-button>
				</li>
			</ul>
		</el-popover>
	</div>

	<DragDialog v-model="openState" :init-w="900" :init-y="100" :init-h="600" can-resize>
		<div style="width: calc(100% - 1em)">
			<GenerateConfigForm
				v-if="configType == 'GenConfigForm'"
				@cancel="openState = false"
				@submit="openState = false"></GenerateConfigForm>
			<TypeMappingsEditor
				v-else-if="configType == 'TypeMappingsEditor'"></TypeMappingsEditor>
			<ColumnDefaultEditor
				v-else-if="configType == 'ColumnDefaultEditor'"></ColumnDefaultEditor>
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
