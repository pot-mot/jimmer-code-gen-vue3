<script setup lang="ts">
import FilterableSelect from "@/components/select/FilterableSelect.vue";
import DatabaseTypeView from "@/modelEditor/modelForm/databaseType/DatabaseTypeView.vue";
import IconClose from "@/components/icons/IconClose.vue";
import {ref} from "vue";
import {translate} from "@/store/i18nStore.ts";

const databaseType = defineModel<DatabaseType | undefined>({
    required: true
})

const databaseTypes: DatabaseType[] = [
    "POSTGRESQL",
    "MYSQL",
    "ORACLE",
    "SQLSERVER",
    "H2",
    "SQLITE",
]

const currentIndex = ref(-1)
</script>

<template>
    <FilterableSelect
        v-model="databaseType"
        v-model:current-index="currentIndex"
        :options="databaseTypes"
        :get-id="(it) => it ?? ''"
        can-filter
        :filter="(option, filterText) => option?.toLowerCase().includes(filterText.toLowerCase()) ?? false"
    >
        <template #selected="{option}">
            <DatabaseTypeView
                v-if="databaseType !== undefined"
                :database-type="option"
                class="database-type-selected-option"
            />
            <div v-else class="database-type-selected-option placeholder">
                {{ translate({key: 'select_placeholder', args: [translate('database_type')]}) }}
            </div>
        </template>
        <template #afterInput>
            <button
                v-if="databaseType !== undefined"
                @click="databaseType = undefined; currentIndex = -1;"
                style="border: none;"
            >
                <IconClose/>
            </button>
        </template>
        <template #option="{option}">
            <DatabaseTypeView :database-type="option" class="database-type-option"/>
        </template>
    </FilterableSelect>
</template>

<style scoped>
.database-type-selected-option {
    padding: 0.25rem;
    font-size: 0.8rem;
}

.database-type-option {
    min-width: 6rem;
    font-size: 0.8rem;
}

.placeholder {
    white-space: nowrap;
    color: var(--comment-color);
}

:deep(.filter-input) {
    font-size: 0.8rem;
}

.input-focus .database-type-selected-option.placeholder {
    width: 0;
    padding-left: 0;
    padding-right: 0;
    overflow: hidden;
    margin-left: 0.5rem;
}
</style>
