<script setup lang="ts">
import {
	GenEntityConfigInput,
	GenEntityConfigInput_TargetOf_properties,
	GenPropertyEntityConfigInput
} from "@/api/__generated/model/static"
import {computed, ref, watch} from "vue"
import Comment from "@/components/global/common/Comment.vue";

const entityDto_CONSTANTS = [
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

type EntityDto = typeof entityDto_CONSTANTS[number]

type PropertyOption = GenEntityConfigInput_TargetOf_properties | GenPropertyEntityConfigInput

const entityDto_propertyDtoProperty: { [key in EntityDto]: keyof PropertyOption } = {
	'LIST_VIEW': 'inListView',
	'DETAIL_VIEW': 'inDetailView',
	'OPTION_VIEW': 'inOptionView',
	'INSERT_INPUT': 'inInsertInput',
	'UPDATE_INPUT': 'inUpdateInput',
	'SPECIFICATION': 'inSpecification',
	'SHORT_ASSOCIATION_VIEW': 'inShortAssociationView',
	'LONG_ASSOCIATION_INPUT': 'inLongAssociationInput',
	'LONG_ASSOCIATION_VIEW': 'inLongAssociationView',
}

const entity = defineModel<GenEntityConfigInput>('entity', {
	required: true
})

const properties = defineModel<Array<GenPropertyEntityConfigInput>>('properties', {
	required: true
})


const allPropertyOptions = computed<Array<PropertyOption>>(() => {
	return [
		...entity.value.properties,
		...properties.value
	]
})

const getDtoPropertyMap = (): Map<EntityDto, Array<PropertyOption>> => {
	const result = new Map<EntityDto, Array<PropertyOption>>

	const setOrPush = (dto: EntityDto, property: PropertyOption) => {
		const array = result.get(dto)
		if (array === undefined) {
			result.set(dto, [property])
		} else {
			array.push(property)
		}
	}

	for (const property of allPropertyOptions.value) {
		for (const [key, propertyProperty] of Object.entries(entityDto_propertyDtoProperty) as Array<[EntityDto, keyof PropertyOption]>) {
			if (property[propertyProperty]) {
				setOrPush(key, property)
			}
		}
	}

	return result
}

const dtoProperties = ref<Map<EntityDto, Array<PropertyOption>>>(getDtoPropertyMap())

watch(() => entity.value, () => {
	dtoProperties.value = getDtoPropertyMap()
})

const handleDtoPropertyChange = (dto: EntityDto, selectProperties: Array<PropertyOption>) => {
	const dtoProperty = entityDto_propertyDtoProperty[dto]
	entity.value.properties.forEach(property => {
		// @ts-ignore
		property[dtoProperty] = selectProperties.includes(property)
	})
	properties.value.forEach(property => {
		// @ts-ignore
		property[dtoProperty] = selectProperties.includes(property)
	})

	dtoProperties.value.set(dto, selectProperties)
}
</script>

<template>
	<div v-for="dto in entityDto_CONSTANTS">
		<el-text>{{ dto }}</el-text>
		<el-select
			:model-value="dtoProperties.get(dto)"
			@change="(properties: Array<PropertyOption>) => {
				handleDtoPropertyChange(dto, properties)
			}"
			multiple filterable
			value-key="name"
		>
			<el-option
				v-for="property in allPropertyOptions"
				:key="property.name"
				:value="property"
				:label="property.name"
			>
				{{ property.name }}
				<Comment :comment="property.comment"/>
			</el-option>
		</el-select>
	</div>
</template>
