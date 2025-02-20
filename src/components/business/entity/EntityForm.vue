<script setup lang="ts">
import {EntityConfigInput, EntityConfigView, IdName} from "@/api/__generated/model/static";
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
import NotConvertedPropertyConfig from "@/components/business/property/NotConvertedPropertyConfig.vue";
import ConvertedPropertyConfig from "@/components/business/property/ConvertedPropertyConfig.vue";
import {validateGenPropertyConfigInput} from "@/shape/GenPropertyConfigInput.ts";
import Comment from "@/components/global/common/Comment.vue";
import {useConfigView} from "@/components/business/entity/useConfigView.ts";

const i18nStore = useI18nStore()

const entityConfigView = defineModel<EntityConfigView>({
    required: true
})

const {
    entity,
    convertedProperties,
    notConvertedProperties,
    toInput,
} = useConfigView(entityConfigView)

const props = defineProps<{
    validate: (input: DeepReadonly<EntityConfigInput>) => Promise<MainLocaleKeyParam[]>,
}>()

const emits = defineEmits<FormEmits<EntityConfigInput, EntityConfigView> & {
    (event: "click-enum", genEnum: IdName): void
    (event: "click-entity", entity: IdName): void
}>()

const handleCancel = () => {
    emits('cancel', entityConfigView.value)
}

const handleSubmit = async () => {
    const input = toInput()

    const messageList = await props.validate(input)

    if (messageList.length > 0) {
        messageList.forEach(it => sendI18nMessage(it, 'warning'))
        return
    }

    emits('submit', input)
}
</script>

<template>
    <el-form class="entity-form">
        <el-row :gutter="12" style="line-height: 2em; padding-left: 1em;">
            <el-col :span="24">
                <AnnotationNullableEditor v-model="entity.otherAnnotation"/>
            </el-col>

            <el-col :span="12">
                <el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_name')">
                    <div class="input-with-overwrite">
                        <el-tooltip :content="i18nStore.translate('LABEL_EntityConfigForm_overwriteName')">
                            <el-checkbox v-model="entity.overwriteName"/>
                        </el-tooltip>

                        <el-input v-if="entity.overwriteName" v-model="entity.name"/>
                        <el-text v-else style="font-size: 1.1em;">{{ entity.name }}</el-text>
                    </div>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_comment')">
                    <div class="input-with-overwrite">
                        <el-tooltip :content="i18nStore.translate('LABEL_EntityConfigForm_overwriteComment')">
                            <el-checkbox v-model="entity.overwriteComment"/>
                        </el-tooltip>

                        <el-input v-if="entity.overwriteComment" v-model="entity.comment"/>
                        <Comment v-else style="font-size: 1em;" :comment="entity.comment"/>
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

            <ViewList :lines="convertedProperties">
                <template #default="{index}">
                    <ConvertedPropertyConfig
                        class="converted-property-config"
                        v-model="convertedProperties[index]"
                        @click-entity="genEntity => emits('click-entity', genEntity)"
                        @click-enum="genEnum => emits('click-enum', genEnum)"
                    />
                </template>
            </ViewList>

            <EditList
                v-model:lines="notConvertedProperties"
                :default-line="getDefaultProperty"
                :label-line="false"
                :json-schema-validate="validateGenPropertyConfigInput"
                style="padding-top: 1em;"
            >
                <template #default="{index}">
                    <NotConvertedPropertyConfig
                        class="not-converted-property-config"
                        v-model="notConvertedProperties[index]"
                    />
                </template>
            </EditList>
        </Details>

        <Details style="padding: 1em 0;">
            <template #title>
                <el-text size="default">{{ i18nStore.translate('LABEL_EntityConfigForm_businessConfig') }}</el-text>
            </template>

            <EntityBusinessSelect v-model="entityConfigView"/>
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

.input-with-overwrite {
    width: 100%;
    display: grid;
    grid-gap: 0.6em;
    grid-template-columns: 1em calc(100% - 1.6em);
}

.converted-property-config,
.not-converted-property-config {
    margin-bottom: 1em;
}
</style>
