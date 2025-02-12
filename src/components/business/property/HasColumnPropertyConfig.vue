<script setup lang="ts">
import AnnotationNullableEditor from "@/components/business/annotation/AnnotationNullableEditor.vue";
import {
    GenEntityDetailView_TargetOf_properties,
    IdName
} from "@/api/__generated/model/static";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import {stringifyPropertyType} from "@/components/business/property/stringifyPropertyType.ts";

const i18nStore = useI18nStore()

const property = defineModel<GenEntityDetailView_TargetOf_properties>({
    required: true
})

const emits = defineEmits<{
    (event: "click-enum", genEnum: IdName): void
    (event: "click-entity", entity: IdName): void
}>()
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
                <div class="input-with-checkbox">
                    <el-input v-model="property.name" :disabled="!property.overwriteName"/>
                    <el-tooltip
                        :content="i18nStore.translate('LABEL_EntityConfigForm_property_overwriteName')">
                        <el-checkbox v-model="property.overwriteName"/>
                    </el-tooltip>
                </div>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_comment')">
                <div class="input-with-checkbox">
                    <el-input v-model="property.comment" :disabled="!property.overwriteComment"/>
                    <el-tooltip
                        :content="i18nStore.translate('LABEL_EntityConfigForm_property_overwriteComment')">
                        <el-checkbox v-model="property.overwriteComment"/>
                    </el-tooltip>
                </div>
            </el-form-item>
        </el-col>

        <el-col :span="8">
            <el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_type')">
                <el-button
                    v-if="property.enum !== undefined"
                    @click="emits('click-enum', property.enum)"
                >
                    {{ stringifyPropertyType(property) }}
                </el-button>

                <template v-else-if="property.typeEntity !== undefined">
                    <el-button @click="emits('click-entity', property.typeEntity)">
                        {{ stringifyPropertyType(property) }}
                    </el-button>
                    <el-tooltip :content="i18nStore.translate('LABEL_EntityConfigForm_property_longAssociation')">
                        <el-checkbox v-model="property.longAssociation" style="padding-left: 0.5em;"/>
                    </el-tooltip>
                </template>

                <el-input
                    v-else
                    disabled
                    :model-value="stringifyPropertyType(property)"
                    style="width: 100%;"
                />
            </el-form-item>
        </el-col>

        <el-col :span="24">
            <el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_remark')">
                <el-input v-model="property.remark"/>
            </el-form-item>
        </el-col>
    </el-row>
</template>

<style scoped>
.input-with-checkbox {
    width: 100%;
    display: grid;
    grid-gap: 0.6em;
    grid-template-columns: calc(100% - 1.6em) 1em;
}

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