<script setup lang="ts">
import {useI18nStore} from "@/store/i18n/i18nStore.ts"
import {GenEntityConfigInput} from "@/api/__generated/model/static"
import {computed} from "vue"

const i18nStore = useI18nStore()

const entityBusiness_CONSTANTS = [
	'ADD',
	'EDIT',
	'QUERY',
	'DELETE',
	'PAGE',
] as const

type EntityBusiness = typeof entityBusiness_CONSTANTS[number]

const entity = defineModel<GenEntityConfigInput>({
	required: true
})

const entityBusinesses = computed<EntityBusiness[]>({
	get() {
		const result: EntityBusiness[] = []
		if (entity.value.canAdd) result.push('ADD')
		if (entity.value.canEdit) result.push('EDIT')
		if (entity.value.canQuery) result.push('QUERY')
		if (entity.value.canDelete) result.push('DELETE')
		if (entity.value.hasPage) result.push('PAGE')
		return result
	},
	set(value: EntityBusiness[]) {
		entity.value.canAdd = value.includes('ADD')
		entity.value.canEdit = value.includes('EDIT')
		entity.value.canQuery = value.includes('QUERY')
		entity.value.canDelete = value.includes('DELETE')
		entity.value.hasPage = value.includes('PAGE')
	}
})
</script>

<template>
	<el-select multiple clearable placeholder="" v-model="entityBusinesses">
		<el-option value="ADD">
			{{ i18nStore.translate('LABEL_EntityBusiness_add') }}
		</el-option>
		<el-option value="EDIT">
			{{ i18nStore.translate('LABEL_EntityBusiness_edit') }}
		</el-option>
		<el-option value="QUERY">
			{{ i18nStore.translate('LABEL_EntityBusiness_query') }}
		</el-option>
		<el-option value="DELETE">
			{{ i18nStore.translate('LABEL_EntityBusiness_delete') }}
		</el-option>
		<el-option value="PAGE">
			{{ i18nStore.translate('LABEL_EntityBusiness_hasPage') }}
		</el-option>
	</el-select>
</template>
