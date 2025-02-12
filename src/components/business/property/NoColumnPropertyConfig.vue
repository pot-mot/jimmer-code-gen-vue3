<script setup lang="ts">
import PropertyBodyEditor from "@/components/business/property/PropertyBodyEditor.vue";
import AnnotationNullableEditor from "@/components/business/annotation/AnnotationNullableEditor.vue";
import {GenPropertyEntityConfigInput} from "@/api/__generated/model/static";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";

const i18nStore = useI18nStore()

const property = defineModel<GenPropertyEntityConfigInput>({
    required: true
})
</script>

<template>
    <el-row :gutter="12">
        <el-col :span="24">
            <el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_otherAnnotation')">
                <AnnotationNullableEditor v-model="property.otherAnnotation"/>
            </el-form-item>
        </el-col>

        <el-col :span="8">
            <el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_name')">
                <el-input v-model="property.name"/>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_comment')">
                <el-input v-model="property.comment"/>
            </el-form-item>
        </el-col>

        <el-col :span="8">
            <el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_type')">
                <div class="input-with-checkbox">
                    <el-input v-model="property.type"/>
                    <el-tooltip
                        :content="i18nStore.translate('LABEL_EntityConfigForm_property_typeNotNull')">
                        <el-checkbox v-model="property.typeNotNull"/>
                    </el-tooltip>
                </div>
            </el-form-item>
        </el-col>

        <el-col :span="24">
            <el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_remark')">
                <el-input v-model="property.remark"/>
            </el-form-item>
        </el-col>

        <el-col :span="24">
            <el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_body')">
                <PropertyBodyEditor v-model="property.body"/>
            </el-form-item>
        </el-col>
    </el-row>
</template>

<style scoped>
.el-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
    padding-top: 0.4em;
}

.el-col .el-form-item {
    line-height: 2em;
    margin-bottom: 0.4em;
}
</style>
