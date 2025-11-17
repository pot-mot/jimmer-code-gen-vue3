<script setup lang="ts">
import type {CrossTypeView} from "@/api/__generated/model/static";
import {computed} from "vue";
import JvmLanguageView from "@/modelEditor/modelForm/jvmLanguage/JvmLanguageView.vue";
import DatabaseTypeView from "@/modelEditor/modelForm/databaseType/DatabaseTypeView.vue";
import {useTypeMapping} from "@/modelEditor/typeMapping/useTypeMapping.ts";
import {translate} from "@/store/i18nStore.ts";

const props = defineProps<{
    crossType: DeepReadonly<CrossTypeView>
}>()

const {jvmTypes, sqlTypes, tsTypes} = useTypeMapping()

const sqlType = computed(() => {
    return sqlTypes.value.find(t => t.id === props.crossType.sqlTypeId)
})

const jvmType = computed(() => {
    return jvmTypes.value.find(t => t.id === props.crossType.jvmTypeId)
})

const tsType = computed(() => {
    return tsTypes.value.find(t => t.id === props.crossType.tsTypeId)
})
</script>

<template>
    <div class="cross-type-viewer">
        <span class="no-drag jvm-type">{{ jvmType?.typeExpression ?? translate('not_existed') }}</span>
        <JvmLanguageView
            v-if="jvmType?.jvmSource !== 'ANY'"
            :jvm-language="jvmType?.jvmSource"
            class="tag"
        />
        <span class="no-drag sql-type">{{ sqlType?.type ?? translate('not_existed') }}</span>
        <DatabaseTypeView
            v-if="sqlType?.databaseSource !== 'ANY'"
            :database-type="sqlType?.databaseSource"
            class="tag"
        />
        <span class="no-drag ts-type">{{ tsType?.typeExpression ?? translate('not_existed') }}</span>
        <span class="no-drag" v-if="crossType.nullable === true">{{ translate('nullableLimit_true') }}</span>
        <span class="no-drag" v-else-if="crossType.nullable === false">{{ translate('nullableLimit_false') }}</span>
        <span class="no-drag" v-else-if="crossType.nullable === undefined">{{ translate('nullableLimit_undefined') }}</span>
    </div>
</template>

<style scoped>
.cross-type-viewer {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.5rem;
    font-size: 0.9rem;
}

.tag {
    border: var(--border);
    border-color: var(--border-color-light);
    border-radius: 0.25rem;
    padding: 0 0.5rem;
    font-size: 0.75rem;
}
</style>
