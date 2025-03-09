<script setup lang="ts">
import {GenModelInput_TargetOf_subGroups} from "@/api/__generated/model/static";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import {DeepReadonly} from "vue";
import {MainLocaleKeyParam} from "@/i18n";
import {sendI18nMessage} from "@/message/message.ts";

const i18nStore = useI18nStore()

const subGroup = defineModel<GenModelInput_TargetOf_subGroups>({
    required: true
})

const props = defineProps<{
    validate: (genEnum: DeepReadonly<GenModelInput_TargetOf_subGroups>) => MainLocaleKeyParam[],
}>()

const emits = defineEmits<FormEmits<GenModelInput_TargetOf_subGroups>>()

// 提交
const handleSubmit = async () => {
    const messageList = props.validate(subGroup.value)

    if (messageList.length > 0) {
        messageList.forEach(it => sendI18nMessage(it, 'warning'))
        return
    }

    emits("submit", subGroup.value)
}

// 取消
const handleCancel = (): void => {
    emits("cancel", subGroup.value)
}
</script>

<template>
    <el-form label-width="auto">
        <el-form-item prop="name" label="名称">
            <el-input
                v-model="subGroup.name"
                placeholder="请输入名称"
                clearable
            />
        </el-form-item>
        <el-form-item prop="comment" label="注释">
            <el-input
                v-model="subGroup.comment"
                placeholder="请输入注释"
                clearable
            />
        </el-form-item>
        <el-form-item prop="subPackagePath" label="子包路径">
            <el-input
                v-model="subGroup.subPackagePath"
                placeholder="请输入子包路径"
                clearable
            />
        </el-form-item>
        <el-form-item prop="style" label="样式">
            <el-input
                v-model="subGroup.style"
                placeholder="请输入样式"
                clearable
            />
        </el-form-item>

        <div style="text-align: right; position: absolute; bottom: 0.5em; right: 1em; width: 10em;">
            <el-button type="info" @click="handleCancel">{{ i18nStore.translate('BUTTON_cancel') }}</el-button>
            <el-button type="primary" @click="handleSubmit">{{ i18nStore.translate('BUTTON_submit') }}</el-button>
        </div>
    </el-form>
</template>
