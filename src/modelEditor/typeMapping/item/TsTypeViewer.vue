<script setup lang="ts">
import type {TsTypeView} from "@/api/__generated/model/static";
import CollapseDetail from "@/components/collapse/CollapseDetail.vue";
import {computed} from "vue";
import {translate} from "@/store/i18nStore.ts";
import JvmLanguageView from "@/modelEditor/modelForm/jvmLanguage/JvmLanguageView.vue";
import DatabaseTypeView from "@/modelEditor/modelForm/databaseType/DatabaseTypeView.vue";

const props = defineProps<{
    tsType: DeepReadonly<TsTypeView>
}>()

const collapseDisabled = computed(() => {
    return (
        props.tsType.extraImports.length +
        props.tsType.jvmMatchRules.length +
        props.tsType.sqlMatchRules.length
    ) === 0
})
</script>

<template>
    <CollapseDetail
        class="ts-type-viewer"
        :disabled="collapseDisabled"
    >
        <template #head>
            <div class="ts-type-viewer-header">
                <span class="no-drag">{{ tsType.typeExpression }}</span>
            </div>
        </template>

        <template #body>
            <div class="viewer-item" v-if="tsType.extraImports.length > 0">
                <span class="label no-drag">{{ translate("extraImports") }}</span>
                <ul>
                    <li v-for="item in tsType.extraImports">
                        <span class="no-drag">{{ item.name }}</span>
                        <span> from </span>
                        <span class="no-drag">{{ item.fromPath }}</span>
                    </li>
                </ul>
            </div>

            <div class="viewer-item" v-if="tsType.jvmMatchRules.length > 0">
                <span class="label no-drag">{{ translate("jvmMatchRules") }}</span>
                <ul>
                    <li v-for="item in tsType.jvmMatchRules">
                        <JvmLanguageView v-if="item.jvmSource !== 'ANY'" :jvm-language="item.jvmSource" class="tag"/>
                        <span class="no-drag">{{ item.matchRegExp }}</span>
                    </li>
                </ul>
            </div>

            <div class="viewer-item" v-if="tsType.sqlMatchRules.length > 0">
                <span class="label no-drag">{{ translate("sqlMatchRules") }}</span>
                <ul>
                    <li v-for="item in tsType.sqlMatchRules">
                        <DatabaseTypeView v-if="item.databaseSource !== 'ANY'" :database-type="item.databaseSource" class="tag"/>
                        <span class="no-drag">{{ item.matchRegExp }}</span>
                    </li>
                </ul>
            </div>
        </template>
    </CollapseDetail>
</template>

<style scoped>
.ts-type-viewer {
    padding: 0.25rem 0.5rem;
    font-size: 0.9rem;
}

.ts-type-viewer-header {
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
