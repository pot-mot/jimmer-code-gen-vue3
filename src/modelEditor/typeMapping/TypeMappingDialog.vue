<script setup lang="ts">
import TsTypeList from '@/modelEditor/typeMapping/list/TsTypeList.vue';
import JvmTypeList from '@/modelEditor/typeMapping/list/JvmTypeList.vue';
import SqlTypeList from '@/modelEditor/typeMapping/list/SqlTypeList.vue';
import DragResizeDialog from '@/components/dialog/DragResizeDialog.vue';
import {resetTypeMapping, useTypeMapping} from '@/modelEditor/typeMapping/useTypeMapping.ts';
import CollapseDetail from '@/components/collapse/CollapseDetail.vue';
import {translate} from '@/store/i18nStore.ts';
import CrossTypeList from '@/modelEditor/typeMapping/list/CrossTypeList.vue';
import IconRefresh from '@/components/icons/IconRefresh.vue';

const {openState} = useTypeMapping();
</script>

<template>
    <DragResizeDialog
        v-model="openState"
        can-resize
        modal
        :init-w="700"
    >
        <template #title>
            {{ translate('type_mapping_dialog_title') }}

            <button
                class="reset-button"
                @click="resetTypeMapping"
            >
                <IconRefresh />
                {{ translate('reset') }}
            </button>
        </template>

        <div class="type-mapping-dialog-wrapper">
            <CollapseDetail
                :model-value="true"
                trigger-position="left"
            >
                <template #head>
                    {{ translate('cross_type') }}
                </template>
                <template #body>
                    <CrossTypeList class="list-body" />
                </template>
            </CollapseDetail>

            <CollapseDetail trigger-position="left">
                <template #head>
                    {{ translate('jvm_type') }}
                </template>
                <template #body>
                    <JvmTypeList class="list-body" />
                </template>
            </CollapseDetail>

            <CollapseDetail trigger-position="left">
                <template #head>
                    {{ translate('sql_type') }}
                </template>
                <template #body>
                    <SqlTypeList class="list-body" />
                </template>
            </CollapseDetail>

            <CollapseDetail trigger-position="left">
                <template #head>
                    {{ translate('ts_type') }}
                </template>
                <template #body>
                    <TsTypeList class="list-body" />
                </template>
            </CollapseDetail>
        </div>
    </DragResizeDialog>
</template>

<style scoped>
.type-mapping-dialog-wrapper {
    padding: 0.5rem 1rem;
}

.list-body {
    padding: 0.5rem;
}

.reset-button {
    border-radius: 0.25rem;
    margin-left: 0.25rem;
    cursor: pointer;
}
</style>
