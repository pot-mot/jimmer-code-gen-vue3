<script setup lang="ts">
import EditList from "@/components/global/list/EditList.vue";
import {GenModelInput_TargetOf_enums} from "@/api/__generated/model/static";
import {computed, DeepReadonly, ref, watch} from "vue";
import {enumItemColumns} from "@/components/business/enum/enumItemColumns.ts";
import {EnumType_CONSTANTS} from "@/api/__generated/model/enums";
import Line from "@/components/global/line/Line.vue";
import LineItem from "@/components/global/line/LineItem.vue";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import {sendI18nMessage} from "@/message/message.ts";
import {getDefaultEnum, getDefaultEnumItem} from "@/components/business/enum/defaultEnum.ts";
import {validateEnumItem} from "@/shape/GenEnumModelInput.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import {MainLocaleKeyParam} from "@/i18n";
import Comment from "@/components/global/common/Comment.vue";

const i18nStore = useI18nStore()

const props = defineProps<{
    enum?: Partial<GenModelInput_TargetOf_enums>,

    validate: (genEnum: DeepReadonly<GenModelInput_TargetOf_enums>) => MainLocaleKeyParam[],
}>()

const emits = defineEmits<FormEmits<GenModelInput_TargetOf_enums>>()

const genEnum = ref<GenModelInput_TargetOf_enums>(getDefaultEnum())

const getData = async () => {
    if (props.enum) {
        genEnum.value = {
            ...getDefaultEnum(),
            ...props.enum
        }
    } else {
        genEnum.value = getDefaultEnum()
    }
}

watch(() => props.enum, () => {
    getData()
}, {immediate: true})

watch(() => genEnum.value.enumType, (value) => {
    if (value === 'NAME') {
        genEnum.value.items.forEach((item) => {
            item.mappedValue = item.name
        })
    } else if (value === 'ORDINAL') {
        genEnum.value.items.forEach((item, index) => {
            item.mappedValue = index.toString()
        })
    }
})

const defaultItemIndex = computed<number | undefined>({
    get() {
        const index = genEnum.value.items.findIndex(it => it.defaultItem)
        return index === -1 ? undefined : index
    },
    set(defaultIndex: number | undefined) {
        genEnum.value.items.forEach((it, index) => {
            it.defaultItem = index === defaultIndex
        })
    }
})

const handleSubmit = () => {
    const messageList = props.validate(genEnum.value)

    if (messageList.length > 0) {
        messageList.forEach(it => sendI18nMessage(it, 'warning'))
        return
    }

    genEnum.value.items.forEach((item, index) => {
        item.orderKey = index
    })

    emits('submit', genEnum.value)
}

const handleCancel = () => {
    emits('cancel', genEnum.value)
}
</script>

<template>
    <el-form style="width: calc(100% - 0.5rem);">
        <Line height="3em">
            <LineItem>
                <el-form-item :label="i18nStore.translate('LABEL_EnumForm_name')">
                    <el-input v-model="genEnum.name"/>
                </el-form-item>
            </LineItem>

            <LineItem>
                <el-form-item :label="i18nStore.translate('LABEL_EnumForm_comment')">
                    <el-input v-model="genEnum.comment"/>
                </el-form-item>
            </LineItem>

            <LineItem>
                <el-form-item :label="i18nStore.translate('LABEL_EnumForm_type')">
                    <el-select
                        v-model="genEnum.enumType"
                        clearable @clear="() => genEnum.enumType = undefined"
                        :placeholder="i18nStore.translate('LABEL_EnumForm_typeUnset')">
                        <el-option v-for="type in EnumType_CONSTANTS" :value="type"/>
                    </el-select>
                </el-form-item>
            </LineItem>
        </Line>

        <el-form-item :label="i18nStore.translate('LABEL_EnumForm_notNullDefaultItem')">
            <el-select v-model="defaultItemIndex" filterable clearable>
                <el-option
                    v-for="(item, index) in genEnum.items"
                    :key="item.name + item.comment + item.mappedValue + item.remark"
                    :label="item.name"
                    :value="index">
                    {{ item.name }}
                    <Comment :comment="item.comment"/>
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="备注">
            <el-input type="textarea" v-model="genEnum.remark"/>
        </el-form-item>

        <EditList
            v-model:lines="genEnum.items"
            :columns="enumItemColumns"
            :defaultLine="getDefaultEnumItem"
            :json-schema-validate="validateEnumItem"
            height="2em"
            style="padding-bottom: 2em;"
        >
            <template #mappedValue="{data}">
                <el-input
                    v-if="genEnum.enumType === 'NAME'"
                    v-model="data.mappedValue"/>
                <el-input-number
                    v-else-if="genEnum.enumType === 'ORDINAL'"
                    v-model="data.mappedValue"
                    :precision="0"
                    style="width: 100%"/>
                <el-input
                    v-else
                    disabled
                    :model-value="data.mappedValue"/>
            </template>
        </EditList>

        <div style="text-align: right; position: absolute; bottom: 0.5em; right: 1em;">
            <el-button type="info" @click="handleCancel">{{ i18nStore.translate('BUTTON_cancel') }}</el-button>
            <el-button type="primary" @click="handleSubmit">{{ i18nStore.translate('BUTTON_submit') }}</el-button>
        </div>
    </el-form>
</template>
