<script setup lang="ts">
import {EntityModelBusinessInput, IdName} from "@/api/__generated/model/static";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import {DeepReadonly} from "vue";
import EntityBusinessSelect from "@/components/business/entity/EntityBusinessConfig.vue";
import {MainLocaleKeyParam} from "@/i18n";
import {sendI18nMessage} from "@/message/message.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import AnnotationNullableEditor from "@/components/business/annotation/AnnotationNullableEditor.vue";
import Details from "@/components/global/common/Details.vue";
import EditList from "@/components/global/list/EditList.vue";
import {getDefaultProperty} from "@/components/business/property/defaultProperty.ts";
import ViewList from "@/components/global/list/ViewList.vue";
import {
    EntityFormType,
    entityFormTypeToBusinessInput,
    useEntityPropertiesPartByHasColumn
} from "@/components/business/entity/EntityFormType.ts";
import NoColumnPropertyConfig from "@/components/business/property/NoColumnPropertyConfig.vue";
import HasColumnPropertyConfig from "@/components/business/property/HasColumnPropertyConfig.vue";
import {validateGenPropertyEntityConfigInput} from "@/shape/GenPropertyEntityConfigInput.ts";

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
    <el-form class="entity-form">
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
        </el-row>

        <Details open style="padding: 1em 0;">
            <template #title>
                <el-text size="default">{{ i18nStore.translate('LABEL_EntityConfigForm_properties') }}</el-text>
            </template>

            <ViewList :lines="hasColumnProperties">
                <template #default="{index}">
                    <HasColumnPropertyConfig
                        class="has-column-property-config"
                        v-model="hasColumnProperties[index]"
                        @click-entity="genEntity => emits('click-entity', genEntity)"
                        @click-enum="genEnum => emits('click-enum', genEnum)"
                    />
                </template>
            </ViewList>

            <EditList
                v-model:lines="noColumnProperties"
                :default-line="getDefaultProperty"
                :label-line="false"
                :json-schema-validate="validateGenPropertyEntityConfigInput"
                style="padding-top: 1em;"
            >
                <template #default="{index}">
                    <NoColumnPropertyConfig
                        class="no-column-property-config"
                        v-model="noColumnProperties[index]"
                    />
                </template>
            </EditList>
        </Details>

        <Details style="padding: 1em 0;">
            <template #title>
                <el-text size="default">{{ i18nStore.translate('LABEL_EntityConfigForm_businessConfig') }}</el-text>
            </template>

            <EntityBusinessSelect v-model="entity"/>
        </Details>

        <div style="text-align: right; position: absolute; bottom: 0.5em; right: 1em;">
            <el-button type="info" @click="handleCancel">{{ i18nStore.translate('BUTTON_cancel') }}</el-button>
            <el-button type="primary" @click="handleSubmit">{{ i18nStore.translate('BUTTON_save') }}</el-button>
        </div>
    </el-form>
</template>

<style scoped>
.entity-form {
    --list-line-hover-bg-color: var(--list-line-bg-color);
    width: calc(100% - 0.5em);
}

.input-with-checkbox {
    width: 100%;
    display: grid;
    grid-gap: 0.6em;
    grid-template-columns: calc(100% - 1.6em) 1em;
}

.has-column-property-config,
.no-column-property-config {
    margin-bottom: 1em;
}
</style>
