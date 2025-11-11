<script setup lang="ts">
import FilterableSelect from "@/components/select/FilterableSelect.vue";
import JvmLanguageView from "@/modelEditor/modelForm/jvmLanguage/JvmLanguageView.vue";

const jvmLanguage = defineModel<JvmLanguage | "ANY">({
    required: true
})

const jvmLanguages: (JvmLanguage | "ANY")[] = [
    "KOTLIN",
    "JAVA",
    "ANY"
]
</script>

<template>
    <FilterableSelect
        v-model="jvmLanguage"
        :options="jvmLanguages"
        :get-id="(it) => it"
    >
        <template #selected="{option}">
            <JvmLanguageView :jvm-language="option" style="padding: 0.25rem; font-size: 0.8rem; --icon-color: 0.8rem;"/>
        </template>
        <template #option="{option}">
            <JvmLanguageView :jvm-language="option" style="min-width: 4rem; font-size: 0.8rem; --icon-color: 0.8rem;"/>
        </template>
    </FilterableSelect>
</template>
