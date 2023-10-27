<script setup lang="ts">
import {api} from "../../../api";
import DragDialog from "../../common/DragDialog.vue";
import {ref, watch} from "vue";
import {GenConfig} from "../../../api/__generated/model/static";
import {GenLanguage} from "../../../api/__generated/model/enums";
import {Tools} from "@element-plus/icons-vue"
import GenerateConfigForm from "./GenerateConfigForm.vue";
import TypeMappingsTable from "./TypeMappingsTable.vue";

const config = ref<GenConfig | undefined>()

const languages = ref<GenLanguage[]>([])

const getData = () => {
	api.configService.getConfig().then(res => {
		config.value = res
	})

	api.entityService.listLanguage().then(res => {
		languages.value = res
	})
}

const openState = ref(false)

const configType = ref<'GenerateConfigForm' | 'TypeMappingsTable' | undefined>()

watch(() => openState.value, (value) => {
	if (value) {
		getData()
	}
})
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
				<li>
					<el-button @click="openState = true; configType = 'GenerateConfigForm'" link>全局生成配置</el-button>
				</li>
				<li>
					<el-button @click="openState = true; configType = 'TypeMappingsTable'" link>类型映射配置</el-button>
				</li>
			</ul>
		</el-popover>

	</div>

	<DragDialog v-if="openState" @close="openState = false" :y="100" can-resize>
		<div class="wrapper">
			<GenerateConfigForm v-if="configType == 'GenerateConfigForm'" @cancel="openState = false" @submit="openState = false"></GenerateConfigForm>

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