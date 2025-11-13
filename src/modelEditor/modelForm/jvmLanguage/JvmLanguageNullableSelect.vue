<script setup lang="ts">
import FilterableSelect from "@/components/select/FilterableSelect.vue";
import JvmLanguageView from "@/modelEditor/modelForm/jvmLanguage/JvmLanguageView.vue";
import IconClose from "@/components/icons/IconClose.vue";
import {ref} from "vue";
import {translate} from "@/store/i18nStore.ts";

const jvmLanguage = defineModel<JvmLanguage | undefined>({
    required: true
})

const jvmLanguages: JvmLanguage[] = [
    "KOTLIN",
    "JAVA",
]

const currentIndex = ref(-1)
</script>

<template>
    <FilterableSelect
        v-model="jvmLanguage"
        v-model:current-index="currentIndex"
        :options="jvmLanguages"
        :get-id="(it) => it ?? ''"
    >
        <template #selected="{option}">
            <JvmLanguageView
                v-if="jvmLanguage !== undefined"
                :jvm-language="option"
                class="jvm-language-selected-option"
            />
            <div v-else class="jvm-language-selected-option placeholder">
                {{ translate({key: 'select_placeholder', args: [translate('jvm_language')]}) }}
            </div>
        </template>
        <template #afterInput>
            <button
                v-if="jvmLanguage !== undefined"
                @click="jvmLanguage = undefined; currentIndex = -1;"
                style="border: none;"
            >
                <IconClose/>
            </button>
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

.placeholder {
    white-space: nowrap;
    color: var(--comment-color);
}
</style>
