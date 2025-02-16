<script setup lang="ts">
import AnnotationNullableEditor from "@/components/business/annotation/AnnotationNullableEditor.vue";
import {GenEntityDetailView_TargetOf_properties, IdName} from "@/api/__generated/model/static";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import {stringifyPropertyType} from "@/components/business/property/stringifyPropertyType.ts";
import Comment from "@/components/global/common/Comment.vue";
import PropertyTags from "@/components/business/property/PropertyTags.vue";
import Details from "@/components/global/common/Details.vue";

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
    <Details position="right">
        <template #title>
            <el-row :gutter="12" style="width: calc(100% - 1em);">
                <el-col :span="8">
                    <el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_name')">
                        <div class="input-with-overwrite">
                            <el-tooltip
                                :content="i18nStore.translate('LABEL_EntityConfigForm_property_overwriteName')">
                                <el-checkbox v-model="property.overwriteName"/>
                            </el-tooltip>

                            <el-input v-if="property.overwriteName" v-model="property.name"/>
                            <el-text v-else style="font-size: 1.1em;">{{ property.name }}</el-text>
                        </div>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_comment')">
                        <div class="input-with-overwrite">
                            <el-tooltip
                                :content="i18nStore.translate('LABEL_EntityConfigForm_property_overwriteComment')">
                                <el-checkbox v-model="property.overwriteComment"/>
                            </el-tooltip>

                            <el-input v-if="property.overwriteComment" v-model="property.comment"/>
                            <Comment v-else style="font-size: 1em;" :comment="property.comment"/>
                        </div>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_type')">
                        <template v-if="property.enum !== undefined">
                            <el-button @click="emits('click-enum', property.enum)">
                                {{ stringifyPropertyType(property) }}
                            </el-button>
                            <el-tooltip :content="i18nStore.translate('LABEL_EntityConfigForm_property_listType')">
                                <el-checkbox v-model="property.listType" style="padding-left: 0.5em;"/>
                            </el-tooltip>
                        </template>

                        <template v-else-if="property.typeEntity !== undefined">
                            <el-button @click="emits('click-entity', property.typeEntity)">
                                {{ stringifyPropertyType(property) }}
                            </el-button>
                            <el-tooltip
                                :content="i18nStore.translate('LABEL_EntityConfigForm_property_longAssociation')">
                                <el-checkbox v-model="property.longAssociation" style="padding-left: 0.5em;"/>
                            </el-tooltip>
                        </template>

                        <template v-else>
                            <el-text style="font-size: 1em;">
                                {{ stringifyPropertyType(property) }}
                            </el-text>
                        </template>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_remark')">
                        <el-input v-model="property.remark"/>
                    </el-form-item>
                </el-col>
            </el-row>
        </template>

        <el-row :gutter="12" style="width: calc(100% - 1.5em); margin: 0.5em 0; padding-left: 1em; border-top: var(--el-border);">
            <el-col :span="24">
                <PropertyTags v-model="property"/>
            </el-col>

            <el-col :span="24" v-if="property.idProperty">
                <el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_generatedId')">
                    <el-checkbox v-model="property.generatedId"/>
                </el-form-item>
                <el-form-item v-if="property.generatedId"
                              :label="i18nStore.translate('LABEL_EntityConfigForm_property_generatedIdAnnotation')"
                              label-position="top">
                    <AnnotationNullableEditor style="padding-left: 1em;" v-model="property.generatedIdAnnotation"/>
                </el-form-item>
            </el-col>

            <el-col :span="24" v-if="property.logicalDelete">
                <el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_logicalDeletedAnnotation')"
                              label-position="top">
                    <AnnotationNullableEditor style="padding-left: 1em;" v-model="property.logicalDeletedAnnotation"/>
                </el-form-item>
            </el-col>

            <el-col :span="24">
                <el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_otherAnnotation')"
                              label-position="top">
                    <AnnotationNullableEditor style="padding-left: 1em;" v-model="property.otherAnnotation"/>
                </el-form-item>
            </el-col>
        </el-row>
    </Details>
</template>

<style scoped>
.input-with-overwrite {
    width: 100%;
    display: grid;
    grid-gap: 0.6em;
    grid-template-columns: 1em calc(100% - 1.6em);
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