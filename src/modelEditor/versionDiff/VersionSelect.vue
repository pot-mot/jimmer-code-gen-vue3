<script setup lang="ts">
import type {ModelHistoryNoJsonView} from "@/api/__generated/model/static";
import {formatDateTime} from "@/utils/datetime/timeFormat.ts";
import FilterableSelect from "@/components/select/FilterableSelect.vue";
import {computed} from "vue";

const version = defineModel<ModelHistoryNoJsonView | 'current'>({
    required: true
})

const props = defineProps<{
    versions: DeepReadonly<ModelHistoryNoJsonView[]>
}>()

const versionsWithCurrent = computed<['current', ...ModelHistoryNoJsonView[]]>(() => {
    return [
        'current',
        ...props.versions
    ]
})
</script>

<template>
    <FilterableSelect
        v-model="version"
        :options="versionsWithCurrent"
        :get-id="(option) => (typeof option === 'object' && 'id' in option) ? option.id : ''"
    >
        <template #selected="{option}">
            {{ (typeof option === 'object' && 'modifiedTime' in option) ? formatDateTime(option.modifiedTime) : option }}
        </template>
        <template #option="{option}">
            {{ (typeof option === 'object' && 'modifiedTime' in option) ? formatDateTime(option.modifiedTime) : option }}
        </template>
    </FilterableSelect>
</template>

<style scoped>

</style>