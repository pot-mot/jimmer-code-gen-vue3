<script setup lang="ts">
import {GenPropertyConfigInput} from "@/api/__generated/model/static"
import {computed} from "vue"
import Comment from "@/components/global/common/Comment.vue";

type PropertyOption = Pick<GenPropertyConfigInput,
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

type PropertyBooleanKey = { [K in keyof PropertyOption]: PropertyOption[K] extends boolean ? K : never }[keyof PropertyOption]

const props = defineProps<{
    propName: PropertyBooleanKey
}>()

const properties = defineModel<Array<PropertyOption>>('properties', {
    required: true
})

const selectProperties = computed(() => {
    return properties.value.filter(it => it[props.propName])
})

const handlePropertiesChange = (selectProperties: Array<PropertyOption>) => {
    properties.value.forEach(it => {
        it[props.propName] = selectProperties.includes(it);
    })
}
</script>

<template>
    <el-select
        :model-value="selectProperties"
        multiple filterable
        value-key="name"
        @change="handlePropertiesChange"
    >
        <template #label="{value}">
            {{ value.name }}
        </template>

        <el-option
            v-for="property in properties"
            :key="property.name"
            :value="property"
        >
            {{ property.name }}
            <Comment :comment="property.comment"/>
        </el-option>
    </el-select>
</template>
