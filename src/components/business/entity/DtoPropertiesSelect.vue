<script setup lang="ts">
import {GenEntityDetailView_TargetOf_properties,} from "@/api/__generated/model/static"
import {computed} from "vue"
import Comment from "@/components/global/common/Comment.vue";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";

const i18nStore = useI18nStore()

type PropertyOption = Pick<GenEntityDetailView_TargetOf_properties,
    'name' |
    'comment' |
    'longAssociation' |
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

const stringifyPropertyInfo = (property: PropertyOption): string =>
    (property.longAssociation ? `[${i18nStore.translate('LABEL_EntityBusiness_DTO_LongInput')}]` : '')
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
            {{ stringifyPropertyInfo(value) }}
        </template>

        <el-option
            v-for="property in properties"
            :key="property.name"
            :value="property"
        >
            {{ property.name }}
            <Comment :comment="property.comment"/>
            {{ stringifyPropertyInfo(property) }}
        </el-option>
    </el-select>
</template>
