<script lang="ts" setup>
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import {ref} from "vue";
import {Tools} from "@element-plus/icons-vue"
import TypeMappingForm from "@/components/business/typeMapping/TypeMappingForm.vue";
import ColumnDefaultForm from "@/components/business/columnDefault/ColumnDefaultForm.vue";
import DebugForm from "@/debug/DebugForm.vue";
import GlobalGenConfigForm from "@/components/business/genConfig/GlobalGenConfigForm.vue";
import {languageTypes, useI18nStore} from "@/store/i18n/i18nStore.ts";
import {MainLocale} from "@/i18n";

const i18nStore = useI18nStore()

const globalConfigOptions = ref<{
	name: string,
	label: keyof MainLocale,
	modal: boolean,
	openState: boolean,
}[]>([
	{
		name: 'GlobalGenConfigForm',
		label: 'LABEL_GlobalGenConfigForm',
		modal: true,
		openState: false,
	},
	{
		name: 'TypeMappingForm',
		label: 'LABEL_TypeMappingForm',
		modal: true,
		openState: false,
	},
	{
		name: 'ColumnDefaultForm',
		label: 'LABEL_ColumnDefaultForm',
		modal: true,
		openState: false,
	},
	{
		name: 'DebugForm',
		label: 'LABEL_DebugLog',
		modal: false,
		openState: false,
	}
])

const popoverVisible = ref(false)
</script>

<template>
	<div class="button">
		<el-popover placement="top-end" :visible="popoverVisible">
			<template #reference>
				<el-button link @click="popoverVisible = !popoverVisible">
					<el-icon size="2em">
						<Tools/>
					</el-icon>
				</el-button>
			</template>

			<ul>
				<li v-for="option in globalConfigOptions">
					<el-button link @click="option.openState = true"
							   v-text="i18nStore.translate(option.label)"/>
				</li>
				<li style="border-top: 1px solid #ccc; margin-top: 0.5rem;">
					<el-button
						v-for="language in languageTypes"
						v-text="language"
						@click="i18nStore.language = language"
						:type="i18nStore.language === language ? 'primary' : ''"
						link/>
				</li>
			</ul>
		</el-popover>
	</div>

	<template v-for="option in globalConfigOptions" :key="option.name">
		<DragDialog v-model="option.openState" :init-w="900" :init-y="100" :init-h="630" can-resize
					:modal="option.modal">
			<h3 style="padding-bottom: 20px; text-align: center;" v-text="i18nStore.translate(option.label)"/>
			<div style="width: calc(100% - 1em); padding-left: 0.5em;">
				<GlobalGenConfigForm
					v-if="option.name === 'GlobalGenConfigForm'"
					@cancel="option.openState = false"
					@submit="option.openState = false"/>
				<TypeMappingForm
					v-else-if="option.name === 'TypeMappingForm'"/>
				<ColumnDefaultForm
					v-else-if="option.name === 'ColumnDefaultForm'"/>
				<DebugForm
					v-else-if="option.name === 'DebugForm'"/>
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
