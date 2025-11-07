<script setup lang="ts">
import TsTypeList from "@/modelEditor/typeMapping/TsTypeList.vue";
import JvmTypeList from "@/modelEditor/typeMapping/JvmTypetList.vue";
import SqlTypeList from "@/modelEditor/typeMapping/SqlTypeList.vue";
import DragResizeDialog from "@/components/dialog/DragResizeDialog.vue";
import {useTypeMapping} from "@/modelEditor/typeMapping/useTypeMapping.ts";
import CollapseDetail from "@/components/collapse/CollapseDetail.vue";
import {translate} from "@/store/i18nStore.ts";

const {
    openState
} = useTypeMapping()
</script>

<template>
    <DragResizeDialog
        v-model="openState"
        can-resize
        modal
        :init-w="700"
    >
        <div class="type-mapping-dialog-wrapper">
            <CollapseDetail>
                <template #head>
                    {{ translate("ts_type") }}
                </template>
                <template #body>
                    <TsTypeList/>
                </template>
            </CollapseDetail>

            <CollapseDetail>
                <template #head>
                    {{ translate("jvm_type") }}
                </template>
                <template #body>
                    <JvmTypeList/>
                </template>
            </CollapseDetail>

            <CollapseDetail>
                <template #head>
                    {{ translate("sql_type") }}
                </template>
                <template #body>
                    <SqlTypeList/>
                </template>
            </CollapseDetail>
        </div>
    </DragResizeDialog>
</template>

<style scoped>
.type-mapping-dialog-wrapper {
    padding: 0.5rem 1rem;
}
</style>
