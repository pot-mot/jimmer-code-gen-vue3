<script setup lang="ts">
import PropertyBodyEditor from "@/components/business/property/PropertyBodyEditor.vue";
import AnnotationNullableEditor from "@/components/business/annotation/AnnotationNullableEditor.vue";
import {GenPropertyEntityConfigInput} from "@/api/__generated/model/static";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import LineItem from "@/components/global/line/LineItem.vue";
import Line from "@/components/global/line/Line.vue";
import {PropertySpecialFormType_CONSTANTS} from "@/api/__generated/model/enums";
import {useMultiCodePreviewStore} from "@/store/modelEditor/MultiCodePreviewStore.ts";
import {watch} from "vue";

const i18nStore = useI18nStore()

const property = defineModel<GenPropertyEntityConfigInput>({
    required: true
})

const codeStore = useMultiCodePreviewStore()

watch(() => property.value.typeTableId, (value: number | undefined) => {
    if (value !== undefined) {
        const pair = codeStore.tableIdMap.get(value)
        if (pair !== undefined) {
            property.value.type = `${pair.entity.packagePath}.${pair.entity.name}`
            property.value.enumId = undefined
        } else {
            property.value.type = ""
            property.value.typeTableId = undefined
        }
    }
}, {immediate: true})

watch(() => property.value.enumId, (value: number | undefined) => {
    if (value !== undefined) {
        const genEnum = codeStore.enumIdMap.get(value)
        if (genEnum !== undefined) {
            property.value.type = `${genEnum.packagePath}.${genEnum.name}`
            property.value.typeTableId = undefined
        } else {
            property.value.type = ""
            property.value.enumId = undefined
        }
    }
}, {immediate: true})
</script>

<template>
    <el-row :gutter="12">
        <el-col :span="24">
            <AnnotationNullableEditor v-model="property.otherAnnotation"/>
        </el-col>

        <el-col :span="12">
            <el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_name')">
                <el-input v-model="property.name"/>
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_comment')">
                <el-input v-model="property.comment"/>
            </el-form-item>
        </el-col>

        <el-col :span="24">
            <el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_type')">
                <div class="type-config">
                    <Line>
                        <LineItem v-if="property.listType" span="auto">
                            <el-text>{{ "List<" }}</el-text>
                        </LineItem>

                        <LineItem v-if="!property.typeTableId && !property.enumId">
                            <el-input v-model="property.type"/>
                        </LineItem>

                        <LineItem v-if="!property.enumId">
                            <el-select
                                v-model="property.typeTableId"
                                clearable
                                filterable
                            >
                                <el-option
                                    v-for="pair in codeStore.codes.tableEntityPairs"
                                    :value="pair.table.id"
                                    :label="`${pair.table.name} - ${pair.entity.name}`"
                                />
                            </el-select>
                        </LineItem>

                        <LineItem v-if="!property.typeTableId">
                            <el-select
                                v-model="property.enumId"
                                clearable
                                filterable
                            >
                                <el-option
                                    v-for="genEnum in codeStore.codes.enums"
                                    :value="genEnum.id"
                                    :label="genEnum.name"
                                />
                            </el-select>
                        </LineItem>

                        <LineItem v-if="!property.typeNotNull && !property.listType" span="auto">
                            <el-text>{{ "?" }}</el-text>
                        </LineItem>
                        <LineItem v-if="property.listType" span="auto">
                            <el-text>{{ ">" }}</el-text>
                        </LineItem>

                        <LineItem v-if="property.typeTableId" span="auto">
                            <el-tooltip
                                :content="i18nStore.translate('LABEL_EntityConfigForm_property_longAssociation')">
                                <el-checkbox v-model="property.longAssociation"/>
                            </el-tooltip>
                        </LineItem>
                    </Line>

                    <el-tooltip :content="i18nStore.translate('LABEL_EntityConfigForm_property_typeNotNull')">
                        <el-checkbox v-model="property.typeNotNull"/>
                    </el-tooltip>

                    <el-tooltip :content="i18nStore.translate('LABEL_EntityConfigForm_property_listType')">
                        <el-checkbox v-model="property.listType"/>
                    </el-tooltip>
                </div>
            </el-form-item>
        </el-col>

        <el-col :span="24" v-if="property.enumId === undefined && property.typeTableId === undefined">
            <el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_specialFormType')">
                <el-select v-model="property.specialFormType" clearable>
                    <el-option
                        v-for="type in PropertySpecialFormType_CONSTANTS"
                        :label="type"
                        :value="type"
                    />
                </el-select>
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

.type-config {
    width: 100%;
    display: grid;
    grid-gap: 0.6em;
    grid-template-columns: calc(100% - 3.2em) 1em 1em;
}
</style>
