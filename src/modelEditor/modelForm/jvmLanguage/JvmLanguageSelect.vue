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
            <JvmLanguageView :jvm-language="option" class="jvm-language-selected-option"/>
        </template>
        <template #option="{option}">
            <JvmLanguageView :jvm-language="option" class="jvm-language-option"/>
        </template>
    </FilterableSelect>
</template>

<style scoped>
.jvm-language-selected-option {
    padding: 0.25rem;
    font-size: 0.8rem;
}

.jvm-language-option {
    min-width: 4rem;
    font-size: 0.8rem;
}
</style>
