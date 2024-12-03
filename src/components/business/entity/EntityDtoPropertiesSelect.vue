<script setup lang="ts">
import {GenEntityConfigInput, GenEntityConfigInput_TargetOf_properties} from "@/api/__generated/model/static"
import {ref, watch} from "vue"
import Details from "@/components/global/common/Details.vue";

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

const entityDto_propertyDtoProperty: { [key in EntityDto]: keyof GenEntityConfigInput_TargetOf_properties } = {
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

const entity = defineModel<GenEntityConfigInput>({
	required: true
})

const getDtoPropertyMap = (): Map<EntityDto, Array<GenEntityConfigInput_TargetOf_properties>> => {
	const result = new Map<EntityDto, Array<GenEntityConfigInput_TargetOf_properties>>

	const setOrPush = (dto: EntityDto, property: GenEntityConfigInput_TargetOf_properties) => {
		const array = result.get(dto)
		if (array === undefined) {
			result.set(dto, [property])
		} else {
			array.push(property)
		}
	}

	for (const property of entity.value.properties) {
		for (const [key, propertyProperty] of Object.entries(entityDto_propertyDtoProperty) as Array<[EntityDto, keyof GenEntityConfigInput_TargetOf_properties]>) {
			if (property[propertyProperty]) {
				setOrPush(key, property)
			}
		}
	}

	return result
}

const dtoProperties = ref<Map<EntityDto, Array<GenEntityConfigInput_TargetOf_properties>>>(getDtoPropertyMap())

watch(() => entity.value, () => {
	dtoProperties.value = getDtoPropertyMap()
})

const handleDtoPropertyChange = (dto: EntityDto, properties: Array<GenEntityConfigInput_TargetOf_properties>) => {
	const dtoProperty = entityDto_propertyDtoProperty[dto]
	entity.value.properties.forEach(property => {
		if (properties.includes(property)) {
			// @ts-ignore
			property[dtoProperty] = true
		}
	})

	dtoProperties.value.set(dto, properties)
}
</script>

<template>
	<Details v-for="dto in entityDto_CONSTANTS" open>
		<template #title>
			<el-text>{{ dto }}</el-text>
		</template>

		<el-select
			:model-value="dtoProperties.get(dto)"
			@change="(properties: Array<GenEntityConfigInput_TargetOf_properties>) => {
				handleDtoPropertyChange(dto, properties)
			}"
			multiple filterable
			value-key="name"
		>
			<el-option
				v-for="property in entity.properties"
				:key="property.name"
				:value="property"
				:label="property.name"
			/>
		</el-select>
	</Details>
</template>
