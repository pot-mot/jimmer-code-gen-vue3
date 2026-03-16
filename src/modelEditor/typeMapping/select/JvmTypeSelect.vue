<script setup lang="ts">
import FilterableSelect from '@/components/select/FilterableSelect.vue';
import {useTypeMapping} from '@/modelEditor/typeMapping/useTypeMapping.ts';
import {computed} from 'vue';
import JvmLanguageView from '@/modelEditor/modelForm/jvmLanguage/JvmLanguageView.vue';

const {jvmTypes} = useTypeMapping();

const id = defineModel<string | undefined>({
    required: true,
});

const props = defineProps<{
    jvmSource?: JvmSource;
}>();

const selectedJvmType = computed({
    get() {
        return jvmTypes.value.find((it) => it.id === id.value);
    },
    set(value) {
        if (value === undefined) {
            id.value = undefined;
        } else {
            id.value = value.id;
        }
    },
});

const options = computed(() => {
    if (props.jvmSource === undefined || props.jvmSource === 'ANY') return jvmTypes.value;
    return jvmTypes.value.filter(
        (it) => it.jvmSource === props.jvmSource || it.jvmSource === 'ANY',
    );
});
</script>

<template>
    <FilterableSelect
        v-model="selectedJvmType"
        :options="options"
        :get-id="(it) => it?.id ?? ''"
        can-filter
        :filter="(option, filterText) => option?.typeExpression.includes(filterText) ?? false"
    >
        <template #selected="{option}">
            <div
                v-if="option"
                class="type-selected-option"
            >
                {{ option.typeExpression }}
                <JvmLanguageView
                    v-if="option.jvmSource !== 'ANY'"
                    :jvm-language="option.jvmSource"
                    class="tag"
                />
            </div>
        </template>
        <template #option="{option}">
            <div
                v-if="option"
                class="type-option"
            >
                {{ option.typeExpression }}
                <JvmLanguageView
                    v-if="option.jvmSource !== 'ANY'"
                    :jvm-language="option.jvmSource"
                    class="tag"
                />
            </div>
        </template>
    </FilterableSelect>
</template>

<style scoped>
@import 'TypeSelectStyles.css';
</style>
