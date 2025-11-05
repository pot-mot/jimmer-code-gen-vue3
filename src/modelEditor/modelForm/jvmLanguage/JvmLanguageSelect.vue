<script setup lang="ts">
import FilterableSelect from "@/components/select/FilterableSelect.vue";
import JvmLanguageView from "@/modelEditor/modelForm/jvmLanguage/JvmLanguageView.vue";

const jvmLanguage = defineModel<JvmLanguage>({
    required: true
})

const jvmLanguages: JvmLanguage[] = [
    "KOTLIN",
    "JAVA",
]
</script>

<template>
    <FilterableSelect
        v-model="jvmLanguage"
        :options="jvmLanguages"
        :get-id="(it) => it"
    >
        <template #selected="{option}">
            <JvmLanguageView :jvm-language="option" style="padding: 0.5rem;"/>
        </template>
        <template #option="{option}">
            <div style="min-width: 3rem">
                <JvmLanguageView :jvm-language="option"/>
            </div>
        </template>
    </FilterableSelect>
</template>
