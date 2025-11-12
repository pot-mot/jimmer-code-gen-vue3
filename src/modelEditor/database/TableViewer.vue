<script setup lang="ts">
import type {TableView} from "@/api/__generated/model/static";
import NameCommentViewer from "@/modelEditor/nameComment/NameCommentViewer.vue";
import CollapseDetail from "@/components/collapse/CollapseDetail.vue";
import IconPrimaryKey from "@/components/icons/modelEditor/IconPrimaryKey.vue";
import {translate} from "@/store/i18nStore.ts";
import IconTable from "@/components/icons/IconTable.vue";

defineProps<{
    table: TableView
}>()
</script>

<template>
    <div class="table-viewer">
        <div class="table-viewer-label">
            <IconTable style="margin-right: 0.25rem;"/>
            <span v-if="table.schema" class="no-drag">{{ table.schema }}.</span>
            <NameCommentViewer :data="table" class="no-drag"/>
        </div>

        <!-- 列信息 -->
        <CollapseDetail class="section" trigger-position="left" v-if="table.columns.length > 0">
            <template #head>
                <span class="section-head">{{ translate('columns') }}</span>
                <span class="count">{{ table.columns.length }}</span>
            </template>
            <template #body>
                <div
                    v-for="column in table.columns"
                    :key="column.id"
                    class="column-item"
                >
                    <NameCommentViewer :data="column" class="no-drag"/>
                    <span v-if="column.partOfPrimaryKey" class="primary-key">
                        <IconPrimaryKey/>
                    </span>
                    <span class="no-drag">{{ column.type }}</span>
                    <span v-if="column.defaultValue" class="no-drag" > = {{ column.defaultValue }}</span>
                    <span class="no-drag">{{ column.nullable ? '' : 'NOT NULL' }}</span>
                </div>
            </template>
        </CollapseDetail>

        <!-- 索引信息 -->
        <CollapseDetail class="section" trigger-position="left" v-if="table.indexes.length > 0">
            <template #head>
                <span class="section-head">{{ translate('indexes') }}</span>
                <span class="count">{{ table.indexes.length }}</span>
            </template>
            <template #body>
                <div
                    v-for="index in table.indexes"
                    :key="index.id"
                    class="index-item"
                >
                    <span class="no-drag">{{ index.name }}</span>
                    <span v-if="index.uniqueIndex" class="unique-index no-drag">Unique</span>
                    <span class="no-drag">({{ index.columnNames.join(', ') }})</span>
                    <span v-if="index.wherePredicates" class="no-drag">WHERE {{ index.wherePredicates }}</span>
                </div>
            </template>
        </CollapseDetail>

        <!-- 外键信息 -->
        <CollapseDetail class="section" trigger-position="left" v-if="table.foreignKeys.length > 0">
            <template #head>
                <span class="section-head">{{ translate('foreignKeys') }}</span>
                <span class="count">{{ table.foreignKeys.length }}</span>
            </template>
            <template #body>
                <div
                    v-for="fk in table.foreignKeys"
                    :key="fk.id"
                >
                    <div class="foreign-key-label">
                        <span class="no-drag">{{ fk.name }}</span>
                        <span v-if="fk.onUpdate" class="no-drag">ON UPDATE {{ fk.onUpdate }}</span>
                        <span v-if="fk.onDelete" class="no-drag">ON DELETE {{ fk.onDelete }}</span>
                    </div>
                    <div class="foreign-key-column-ref" v-for="columnRef in fk.columnRefs">
                        <span class="no-drag">{{ columnRef.columnName }}</span>
                        <span class="no-drag"> -> </span>
                        <span v-if="fk.referencedTableSchema" class="no-drag">{{ fk.referencedTableSchema }}.</span>
                        <span class="no-drag">{{ fk.referencedTableName }}.</span>
                        <span class="no-drag">{{ columnRef.referencedColumnName }}</span>
                    </div>
                </div>
            </template>
        </CollapseDetail>

        <!-- 检验信息 -->
        <CollapseDetail class="section" trigger-position="left" v-if="table.checks.length > 0">
            <template #head>
                <span class="section-head">{{ translate('checks') }}</span>
                <span class="count">{{ table.checks.length }}</span>
            </template>
            <template #body>
                <div
                    v-for="check in table.checks"
                    :key="check.id"
                    class="check-item no-drag"
                >
                    <span>{{ check.name }}</span>
                    <span>{{ check.expression }}</span>
                </div>
            </template>
        </CollapseDetail>
    </div>
</template>

<style scoped>
.table-viewer-label {
    font-size: 0.8rem;
    --icon-size: 0.8rem;
}

.section {
    margin-left: 1rem;
}

.section-head {
    font-size: 0.8rem;
}
.count {
    font-size: 0.8rem;
    color: var(--comment-color);
    padding-left: 0.5rem;
}

.column-item,
.index-item,
.foreign-key-label,
.check-item {
    margin-left: 1rem;
    font-size: 0.8rem;
    display: flex;
    gap: 0.5rem;
}

.foreign-key-column-ref {
    margin-left: 2rem;
    font-size: 0.8rem;
}
</style>
