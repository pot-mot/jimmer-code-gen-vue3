<script setup lang="ts">
import {
    EntityModelBusinessInput,
    type GenEntityDetailView_TargetOf_properties,
    IdName
} from "@/api/__generated/model/static";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import {DeepReadonly} from "vue";
import EntityBusinessSelect from "@/components/business/entity/EntityBusinessSelect.vue";
import EntityDtoPropertiesSelect from "@/components/business/entity/EntityDtoPropertiesSelect.vue";
import {MainLocaleKeyParam} from "@/i18n";
import {sendI18nMessage} from "@/message/message.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import AnnotationNullableEditor from "@/components/business/annotation/AnnotationNullableEditor.vue";
import PropertyBodyEditor from "@/components/business/entity/PropertyBodyEditor.vue";
import Details from "@/components/global/common/Details.vue";
import EditList from "@/components/global/list/EditList.vue";
import {getDefaultProperty} from "@/components/business/entity/defaultProperty.ts";
import ViewList from "@/components/global/list/ViewList.vue";
import {
    EntityFormType,
    entityFormTypeToBusinessInput,
    useEntityPropertiesPartByHasColumn
} from "@/components/business/entity/EntityFormType.ts";

const i18nStore = useI18nStore()

const entity = defineModel<EntityFormType>({
    required: true
})

const {hasColumnProperties, noColumnProperties} = useEntityPropertiesPartByHasColumn(entity)

const props = defineProps<{
    validate: (genEnum: DeepReadonly<EntityModelBusinessInput>) => Promise<MainLocaleKeyParam[]>,
}>()

const emits = defineEmits<FormEmits<EntityModelBusinessInput> & {
    (event: "click-enum", genEnum: IdName): void
    (event: "click-entity", entity: IdName): void
}>()

const stringifyPropertyType = (property: GenEntityDetailView_TargetOf_properties): string => {
    let rawType = property.type
    if (property.enum !== undefined) {
        rawType = property.enum.name
    }
    if (property.typeEntity !== undefined) {
        rawType = property.typeEntity.name
    }

    if (property.listType) {
        return `List<${rawType}>`
    } else if (!property.typeNotNull) {
        return `${rawType}?`
    } else {
        return rawType
    }
}

const handleCancel = () => {
    const entityInput: EntityModelBusinessInput = entityFormTypeToBusinessInput(entity.value)

    emits('cancel', entityInput)
}

const handleSubmit = async () => {
    let orderKey = 1
    for (const property of entity.value.properties) {
        property.orderKey = orderKey++
    }

    const entityInput: EntityModelBusinessInput = entityFormTypeToBusinessInput(entity.value)

    const messageList = await props.validate(entityInput)

    if (messageList.length > 0) {
        messageList.forEach(it => sendI18nMessage(it, 'warning'))
        return
    }

    emits('submit', entityInput)
}
</script>

<template>
    <el-form style="width: calc(100% - 0.5rem);">
        <el-row :gutter="12" style="line-height: 2em; padding-left: 1em; padding-bottom: 1em;">
            <el-col :span="24">
                <el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_otherAnnotation')">
                    <AnnotationNullableEditor v-model="entity.otherAnnotation"/>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_name')">
                    <div class="input-with-checkbox">
                        <el-input v-model="entity.name" :disabled="!entity.overwriteName"/>
                        <el-tooltip :content="i18nStore.translate('LABEL_EntityConfigForm_overwriteName')">
                            <el-checkbox v-model="entity.overwriteName"/>
                        </el-tooltip>
                    </div>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_comment')">
                    <div class="input-with-checkbox">
                        <el-input v-model="entity.comment" :disabled="!entity.overwriteComment"/>
                        <el-tooltip :content="i18nStore.translate('LABEL_EntityConfigForm_overwriteComment')">
                            <el-checkbox v-model="entity.overwriteComment"/>
                        </el-tooltip>
                    </div>
                </el-form-item>
            </el-col>

            <el-col :span="24">
                <el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_remark')">
                    <el-input type="textarea" v-model="entity.remark"/>
                </el-form-item>
            </el-col>

            <el-col :span="24">
                <el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_business')">
                    <EntityBusinessSelect v-model="entity"/>
                </el-form-item>
            </el-col>
        </el-row>

        <ViewList
            :lines="hasColumnProperties"
            class="property-list"
        >
            <template #default="{data: property}">
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
        </ViewList>

        <EditList
            v-model:lines="noColumnProperties"
            :default-line="getDefaultProperty"
            :label-line="false"
            class="property-list"
            style="padding-top: 1em;"
        >
            <template #default="{data: property}">
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
        </EditList>

        <Details style="padding: 1em 0;">
            <template #title>
                <el-text size="default">DTO</el-text>
            </template>

            <EntityDtoPropertiesSelect
                :entity="entity"
                v-model:properties="entity.properties"
            />
        </Details>

        <div style="text-align: right; position: absolute; bottom: 0.5em; right: 1em;">
            <el-button type="info" @click="handleCancel">{{ i18nStore.translate('BUTTON_cancel') }}</el-button>
            <el-button type="primary" @click="handleSubmit">{{ i18nStore.translate('BUTTON_save') }}</el-button>
        </div>
    </el-form>
</template>

<style scoped>
.input-with-checkbox {
    width: 100%;
    display: grid;
    grid-gap: 0.6em;
    grid-template-columns: calc(100% - 1.6em) 1em;
}

.property-list .el-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
    padding-top: 0.4em;
}

.property-list .el-col .el-form-item {
    line-height: 2em;
    margin-bottom: 0.4em;
}
</style>
