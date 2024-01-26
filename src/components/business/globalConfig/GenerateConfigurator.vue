<script lang="ts" setup>
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import {computed, ref} from "vue";
import {Tools} from "@element-plus/icons-vue"
import GenerateConfigForm from "@/components/business/genConfig/GenConfigForm.vue";
import TypeMappingsEditor from "@/components/business/typeMapping/TypeMappingsEditor.vue";
import ColumnDefaultEditor from "@/components/business/columnDefault/ColumnDefaultEditor.vue";
import {GenerateConfiguratorOption, GenerateConfiguratorOptions} from "@/components/business/globalConfig/constant.ts";
import {useGlobalGenConfigStore} from "@/components/business/genConfig/GlobalGenConfigStore.ts";

const configType = ref<GenerateConfiguratorOption | undefined>()

const openState = computed<boolean>({
	get() {
		return !!configType.value
	},
	set(value: boolean) {
		if (!value) {
			configType.value = undefined
		}
	}
})

const globalGenConfigStore = useGlobalGenConfigStore()
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
				<li v-for="option in GenerateConfiguratorOptions">
					<el-button link @click="configType = option;">{{ option.label }}
					</el-button>
				</li>
			</ul>
		</el-popover>
	</div>

	<DragDialog v-model="openState" :init-w="900" :init-y="100" :init-h="630" can-resize>
		<h3 style="padding-bottom: 20px; text-align: center;">
			{{ configType?.label }}
		</h3>

		<div style="width: calc(100% - 1em); padding-left: 0.5em;">
			<GenerateConfigForm
				v-if="configType?.name == 'GenConfigForm' && globalGenConfigStore.isLoaded"
				v-model="globalGenConfigStore.genConfig"
				@cancel="openState = false"
				@submit="() => {
					globalGenConfigStore.reset()
					openState = false
				}"></GenerateConfigForm>
			<TypeMappingsEditor
				v-else-if="configType?.name == 'TypeMappingsEditor'"></TypeMappingsEditor>
			<ColumnDefaultEditor
				v-else-if="configType?.name == 'ColumnDefaultEditor'"></ColumnDefaultEditor>
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
