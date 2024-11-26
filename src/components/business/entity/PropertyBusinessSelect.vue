<script setup lang="ts">
import {useI18nStore} from "@/store/i18n/i18nStore.ts"
import {GenEntityConfigInput_TargetOf_properties} from "@/api/__generated/model/static"
import {computed} from "vue"

const i18nStore = useI18nStore()

const propertyBusiness_CONSTANTS = [
	'LIST_VIEW',
	'DETAIL_VIEW',
	'OPTION_VIEW',
	'INSERT_INPUT',
	'UPDATE_INPUT',
	'SPECIFICATION',
	'SHORT_ASSOCIATION_VIEW',
	'LONG_ASSOCIATION_INPUT',
	'LONG_ASSOCIATION_VIEW',
] as const

type PropertyBusiness = typeof propertyBusiness_CONSTANTS[number]

const property = defineModel<GenEntityConfigInput_TargetOf_properties>({
	required: true
})

const propertyBusinesses = computed<PropertyBusiness[]>({
	get() {
		const result: PropertyBusiness[] = []

		if (property.value.inListView) {
			result.push('LIST_VIEW')
		}
		if (property.value.inDetailView) {
			result.push('DETAIL_VIEW')
		}
		if (property.value.inOptionView) {
			result.push('OPTION_VIEW')
		}
		if (property.value.inInsertInput) {
			result.push('INSERT_INPUT')
		}
		if (property.value.inUpdateInput) {
			result.push('UPDATE_INPUT')
		}
		if (property.value.inSpecification) {
			result.push('SPECIFICATION')
		}
		if (property.value.inShortAssociationView) {
			result.push('SHORT_ASSOCIATION_VIEW')
		}
		if (property.value.inLongAssociationInput) {
			result.push('LONG_ASSOCIATION_INPUT')
		}
		if (property.value.inLongAssociationView) {
			result.push('LONG_ASSOCIATION_VIEW')
		}

		return result
	},
	set(value: PropertyBusiness[]) {
		property.value.inListView = value.includes('LIST_VIEW')
		property.value.inDetailView = value.includes('DETAIL_VIEW')
		property.value.inOptionView = value.includes('OPTION_VIEW')
		property.value.inInsertInput = value.includes('INSERT_INPUT')
		property.value.inUpdateInput = value.includes('UPDATE_INPUT')
		property.value.inSpecification = value.includes('SPECIFICATION')
		property.value.inShortAssociationView = value.includes('SHORT_ASSOCIATION_VIEW')
		property.value.inLongAssociationInput = value.includes('LONG_ASSOCIATION_INPUT')
		property.value.inLongAssociationView = value.includes('LONG_ASSOCIATION_VIEW')
	}
})
</script>

<template>
	<el-select multiple clearable placeholder="" v-model="propertyBusinesses">
		<el-option value="LIST_VIEW">
			{{ i18nStore.translate('LABEL_PropertyBusiness_listView') }}
		</el-option>
		<el-option value="DETAIL_VIEW">
			{{ i18nStore.translate('LABEL_PropertyBusiness_detailView') }}
		</el-option>
		<el-option value="OPTION_VIEW">
			{{ i18nStore.translate('LABEL_PropertyBusiness_optionView') }}
		</el-option>
		<el-option value="INSERT_INPUT">
			{{ i18nStore.translate('LABEL_PropertyBusiness_insertInput') }}
		</el-option>
		<el-option value="UPDATE_INPUT">
			{{ i18nStore.translate('LABEL_PropertyBusiness_updateInput') }}
		</el-option>
		<el-option value="SPECIFICATION">
			{{ i18nStore.translate('LABEL_PropertyBusiness_specification') }}
		</el-option>
		<el-option value="SHORT_ASSOCIATION_VIEW">
			{{ i18nStore.translate('LABEL_PropertyBusiness_shortAssociationView') }}
		</el-option>
		<el-option value="LONG_ASSOCIATION_INPUT">
			{{ i18nStore.translate('LABEL_PropertyBusiness_longAssociationInput') }}
		</el-option>
		<el-option value="LONG_ASSOCIATION_VIEW">
			{{ i18nStore.translate('LABEL_PropertyBusiness_longAssociationView') }}
		</el-option>
	</el-select>
</template>
