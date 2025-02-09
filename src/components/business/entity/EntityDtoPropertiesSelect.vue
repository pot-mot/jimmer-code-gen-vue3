<script setup lang="ts">
import {
    GenEntityDetailView_TargetOf_properties,
} from "@/api/__generated/model/static"
import {ref, watch} from "vue"
import Comment from "@/components/global/common/Comment.vue";
import {EntityFormType} from "@/components/business/entity/EntityFormType.ts";

const entityDto_CONSTANTS = [
    'LIST_VIEW',
    'DETAIL_VIEW',
    'OPTION_VIEW',
    'SHORT_ASSOCIATION_VIEW',

    'INSERT_INPUT',
    'UPDATE_INPUT',

    'SPECIFICATION',

    'LONG_ASSOCIATION_INPUT',
    'LONG_ASSOCIATION_VIEW',
] as const

type EntityDto = typeof entityDto_CONSTANTS[number]

type PropertyOption = Pick<GenEntityDetailView_TargetOf_properties,
    'name' |
    'comment' |
    'inListView' |
    'inDetailView' |
    'inOptionView' |
    'inShortAssociationView' |
    'inInsertInput' |
    'inUpdateInput' |
    'inSpecification' |
    'inLongAssociationInput' |
    'inLongAssociationView'
>

type PropertyOptionOnlyBoolean = Pick<GenEntityDetailView_TargetOf_properties,
    'inListView' |
    'inDetailView' |
    'inOptionView' |
    'inShortAssociationView' |
    'inInsertInput' |
    'inUpdateInput' |
    'inSpecification' |
    'inLongAssociationInput' |
    'inLongAssociationView'
>

const entityDto_propertyDtoProperty: { [key in EntityDto]: keyof PropertyOptionOnlyBoolean } = {
    'LIST_VIEW': 'inListView',
    'DETAIL_VIEW': 'inDetailView',
    'OPTION_VIEW': 'inOptionView',
    'SHORT_ASSOCIATION_VIEW': 'inShortAssociationView',

    'INSERT_INPUT': 'inInsertInput',
    'UPDATE_INPUT': 'inUpdateInput',

    'SPECIFICATION': 'inSpecification',

    'LONG_ASSOCIATION_INPUT': 'inLongAssociationInput',
    'LONG_ASSOCIATION_VIEW': 'inLongAssociationView',
}

const props = defineProps<{
    entity: EntityFormType
}>()

const properties = defineModel<Array<PropertyOption>>('properties', {
    required: true
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

    for (const property of properties.value) {
        for (const [key, propertyProperty] of Object.entries(entityDto_propertyDtoProperty) as Array<[EntityDto, keyof PropertyOption]>) {
            if (property[propertyProperty]) {
                setOrPush(key, property)
            }
        }
    }

    return result
}

const dtoProperties = ref<Map<EntityDto, Array<PropertyOption>>>(getDtoPropertyMap())

watch(() => props.entity, () => {
    dtoProperties.value = getDtoPropertyMap()
})

const handleDtoPropertyChange = (dto: EntityDto, selectProperties: Array<PropertyOption>) => {
    const dtoProperty = entityDto_propertyDtoProperty[dto]

    const propertiesOnlyBoolean = properties.value as PropertyOptionOnlyBoolean[]
    propertiesOnlyBoolean.forEach((property, index) => {
        property[dtoProperty] = selectProperties.includes(properties.value[index])
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
                v-for="property in properties"
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
