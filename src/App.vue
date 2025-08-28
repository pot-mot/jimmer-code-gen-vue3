<script setup lang="ts">
import {initDeviceStore} from "@/store/deviceStore.ts";
import {initThemeStore} from "@/store/themeStore.ts";
import {initFocusTargetStore} from "@/store/focusTargetStore.ts";
import TsScriptEditor from "@/components/code/templateEditor/TsScriptEditor.vue";
import {TsScriptExecutor} from "@/utils/script/ts-script-executor.ts";
import {useTemplateRef} from "vue";

initDeviceStore()
initThemeStore()
initFocusTargetStore()

const executor = new TsScriptExecutor<{
    (params: string): string,
    paramTypesLiteral: ['string'],
    returnTypeLiteral: 'string',
    typeDeclares: {},
}>()

const scriptEditorRef = useTemplateRef('scriptEditorRef')

const executeCode = async () => {
    const result = await scriptEditorRef.value?.executeCode(['ok'])
    console.log(result)
}
</script>

<template>
    <button @click="executeCode">execute</button>
    <TsScriptEditor
        :executor="executor"
        :param-types-literal="['string']"
        :return-type-literal="'string'"
        :type-declares="{}"
        ref="scriptEditorRef"
    />
<!--    <RouterView/>-->
</template>
