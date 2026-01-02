<script setup lang="ts">
import type {ModelHistoryNoJsonView} from "@/api/__generated/model/static";
import {formatDateTime} from "@/utils/datetime/timeFormat.ts";
import FilterableSelect from "@/components/select/FilterableSelect.vue";

const version = defineModel<ModelHistoryNoJsonView | undefined>({
    required: true
})

defineProps<{
    versions: ModelHistoryNoJsonView[]
}>()
</script>

<template>
    <FilterableSelect
        v-model="version"
        :options="versions"
        :get-id="(version) => version?.id ?? ''"
    >
        <template #selected="{option}">
            {{ formatDateTime(option?.modifiedTime) }}
        </template>
        <template #option="{option}">
            {{ formatDateTime(option?.modifiedTime) }}
        </template>
    </FilterableSelect>
</template>

<style scoped>

</style>