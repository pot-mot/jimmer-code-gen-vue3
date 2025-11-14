<script setup lang="ts">
import type {SqlTypeView} from "@/api/__generated/model/static";
import CollapseDetail from "@/components/collapse/CollapseDetail.vue";
import {computed} from "vue";
import {translate} from "@/store/i18nStore.ts";
import DatabaseTypeView from "@/modelEditor/modelForm/databaseType/DatabaseTypeView.vue";
import JvmLanguageView from "@/modelEditor/modelForm/jvmLanguage/JvmLanguageView.vue";

const props = defineProps<{
    sqlType: DeepReadonly<SqlTypeView>
}>()

const collapseDisabled = computed(() => {
    return (
        props.sqlType.defaultValue === undefined &&
        props.sqlType.dataSize === undefined &&
        props.sqlType.numericPrecision === undefined &&
        props.sqlType.jvmMatchRules.length === 0 &&
        props.sqlType.tsMatchRules.length === 0
    )
})
</script>

<template>
    <CollapseDetail
        class="sql-type-viewer"
        :disabled="collapseDisabled"
    >
        <template #head>
            <div class="sql-type-viewer-header">
                <span class="no-drag">{{ sqlType.type }}</span>
                <DatabaseTypeView v-if="sqlType.databaseSource !== 'ANY'" :database-type="sqlType.databaseSource" class="tag"/>
            </div>
        </template>

        <template #body>
            <div class="viewer-item" v-if="sqlType.dataSize !== undefined">
                <span class="label no-drag">{{ translate("dataSize") }}</span>
                <span class="no-drag">{{ sqlType.dataSize }}</span>
            </div>

            <div class="viewer-item" v-if="sqlType.numericPrecision !== undefined">
                <span class="label no-drag">{{ translate("numericPrecision") }}</span>
                <span class="no-drag">{{ sqlType.numericPrecision }}</span>
            </div>

            <div class="viewer-item" v-if="sqlType.defaultValue !== undefined">
                <span class="label no-drag">{{ translate("defaultValue") }}</span>
                <span class="no-drag">{{ sqlType.defaultValue }}</span>
            </div>

            <div class="viewer-item" v-if="sqlType.jvmMatchRules.length > 0">
                <span class="label no-drag">{{ translate("jvmMatchRules") }}</span>
                <ul>
                    <li v-for="item in sqlType.jvmMatchRules">
                        <JvmLanguageView v-if="item.jvmSource !== 'ANY'" :jvm-language="item.jvmSource" class="tag"/>
                        <span class="no-drag">{{ item.matchRegExp }}</span>
                    </li>
                </ul>
            </div>
            <div class="viewer-item" v-if="sqlType.tsMatchRules.length > 0">
                <span class="label no-drag">{{ translate("tsMatchRules") }}</span>
                <ul>
                    <li v-for="item in sqlType.tsMatchRules">
                        <span class="no-drag">{{ item.matchRegExp }}</span>
                    </li>
                </ul>
            </div>
        </template>
    </CollapseDetail>
</template>

<style scoped>
.sql-type-viewer {
    padding: 0.25rem 0.5rem;
    font-size: 0.9rem;
}

.sql-type-viewer-header {
    display: flex;
    gap: 0.5rem;
}

.tag {
    border: var(--border);
    border-color: var(--border-color-light);
    border-radius: 0.25rem;
    padding: 0 0.5rem;
    font-size: 0.75rem;
    margin-right: 0.25rem;
}

.viewer-item {
    display: grid;
    grid-gap: 0.5rem;
    grid-template-columns: 8rem 1fr;
}

.viewer-item .label {
    text-align: right;
}
</style>
