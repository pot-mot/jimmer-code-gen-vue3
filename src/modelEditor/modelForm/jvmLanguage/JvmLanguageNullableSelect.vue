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
                style="padding: 0.5rem;"
            />
            <div v-else class="placeholder">
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
            <div style="min-width: 3rem">
                <JvmLanguageView :jvm-language="option"/>
            </div>
        </template>
    </FilterableSelect>
</template>

<style scoped>
.placeholder {
    font-size: 0.8rem;
    padding: 0.5rem;
    white-space: nowrap;
    color: var(--comment-color);
}
</style>
