<script setup lang="ts">
import type {JvmTypeView} from "@/api/__generated/model/static";
import JvmLanguageView from "@/modelEditor/modelForm/jvmLanguage/JvmLanguageView.vue";
import CollapseDetail from "@/components/collapse/CollapseDetail.vue";
import DatabaseTypeView from "@/modelEditor/modelForm/databaseType/DatabaseTypeView.vue";
import {computed} from "vue";
import {translate} from "@/store/i18nStore.ts";

const props = defineProps<{
    jvmType: DeepReadonly<JvmTypeView>
}>()

const collapseDisabled = computed(() => {
    return !props.jvmType.serialized && (
        props.jvmType.extraImports.length +
        props.jvmType.extraAnnotations.length +
        props.jvmType.sqlMatchRules.length +
        props.jvmType.tsMatchRules.length
    ) === 0
})
</script>

<template>
    <CollapseDetail
        class="jvm-type-viewer"
        :disabled="collapseDisabled"
    >
        <template #head>
            <div class="jvm-type-viewer-header">
                <span class="no-drag">{{ jvmType.typeExpression }}</span>
                <JvmLanguageView v-if="jvmType.jvmSource !== 'ANY'" :jvm-language="jvmType.jvmSource" class="tag"/>
            </div>
        </template>

        <template #body>
            <div v-if="jvmType.serialized">
                @Serialized
            </div>
            <div class="viewer-item" v-if="jvmType.extraImports.length > 0">
                <span class="label no-drag">{{ translate("extraImports") }}</span>
                <ul>
                    <li v-for="item in jvmType.extraImports">
                        <span class="no-drag">{{ item }}</span>
                    </li>
                </ul>
            </div>
            <div class="viewer-item" v-if="jvmType.extraAnnotations.length > 0">
                <span class="label no-drag">{{ translate("extraAnnotations") }}</span>
                <ul>
                    <li v-for="item in jvmType.extraAnnotations">
                        <span class="no-drag">{{ item }}</span>
                    </li>
                </ul>
            </div>
            <div class="viewer-item" v-if="jvmType.sqlMatchRules.length > 0">
                <span class="label no-drag">{{ translate("sqlMatchRules") }}</span>
                <ul>
                    <li v-for="item in jvmType.sqlMatchRules" class="match-rule">
                        <span class="no-drag">{{ item.matchRegExp }}</span>
                        <span class="no-drag" v-if="item.nullableLimit === true">{{ translate('nullableLimit_true') }}</span>
                        <span class="no-drag" v-else-if="item.nullableLimit === false">{{ translate('nullableLimit_false') }}</span>
                        <span  class="no-drag" v-else-if="item.nullableLimit === undefined">{{ translate('nullableLimit_undefined') }}</span>
                        <DatabaseTypeView v-if="item.databaseSource !== 'ANY'" :database-type="item.databaseSource" class="tag"/>
                    </li>
                </ul>
            </div>
            <div class="viewer-item" v-if="jvmType.tsMatchRules.length > 0">
                <span class="label no-drag">{{ translate("tsMatchRules") }}</span>
                <ul>
                    <li v-for="item in jvmType.tsMatchRules" class="match-rule">
                        <span class="no-drag">{{ item.matchRegExp }}</span>
                    </li>
                </ul>
            </div>
        </template>
    </CollapseDetail>
</template>

<style scoped>
.jvm-type-viewer {
    padding: 0.25rem 0.5rem;
    font-size: 0.9rem;
}

.jvm-type-viewer-header {
    display: flex;
    gap: 0.5rem;
}

.tag {
    border: var(--border);
    border-color: var(--border-color-light);
    border-radius: 0.25rem;
    padding: 0 0.5rem;
    font-size: 0.75rem;
}

.viewer-item {
    display: grid;
    grid-gap: 0.5rem;
    grid-template-columns: 8rem 1fr;
}

.viewer-item .label {
    text-align: right;
}

.match-rule {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 0.5rem;
}
</style>