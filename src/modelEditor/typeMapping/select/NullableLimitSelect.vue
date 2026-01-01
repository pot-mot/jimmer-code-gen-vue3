<script setup lang="ts">
import {translate} from "@/store/i18nStore.ts";
import FilterableSelect from "@/components/select/FilterableSelect.vue";

const nullableLimit = defineModel<boolean | undefined>({
    required: true,
})
</script>

<template>
    <FilterableSelect
        v-model="nullableLimit"
        :options="[true, false, undefined]"
        :get-id="(it) => `${it}`"
    >
        <template #selected="{option}">
            <div class="nullable-limit-selected-option" v-if="option === true">{{ translate('nullableLimit_true') }}</div>
            <div class="nullable-limit-selected-option" v-else-if="option === false">{{ translate('nullableLimit_false') }}</div>
            <div class="nullable-limit-selected-option" v-else-if="option === undefined">{{ translate('nullableLimit_undefined') }}</div>
        </template>
        <template #option="{option}">
            <div class="nullable-limit-option" v-if="option === true">{{ translate('nullableLimit_true') }}</div>
            <div class="nullable-limit-option" v-else-if="option === false">{{ translate('nullableLimit_false') }}</div>
            <div class="nullable-limit-option" v-else-if="option === undefined">{{ translate('nullableLimit_undefined') }}</div>
        </template>
    </FilterableSelect>
</template>

<style scoped>
.nullable-limit-selected-option {
    height: 1.5rem;
    padding: 0.25rem;
    line-height: 1rem;
    font-size: 0.8rem;
}

.nullable-limit-option {
    height: 1.2rem;
    line-height: 0.8rem;
    padding: 0.2rem 0;
    font-size: 0.8rem;
    min-width: 5rem;
}
</style>
