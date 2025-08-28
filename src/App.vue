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

type MyType = {
    type: string,
    value: string,
}

const executor = new TsScriptExecutor<{
    (params: MyType): string,
    returnTypeLiteral: 'string',
    paramTypesLiteral: ['MyType'],
    typeDeclares: {},
}>(
    'string',
    ['MyType'],
    {'MyType': `{
        type: string,
        value: string,
    }`}
)

const scriptEditorRef = useTemplateRef('scriptEditorRef')

const executeCode = async () => {
    const result = await scriptEditorRef.value?.executeCode([{
        type: "ok",
        value: "the"
    }])
    alert(JSON.stringify(result))
}
</script>

<template>
    <button @click="executeCode">execute</button>
    <TsScriptEditor
        :executor="executor"
        ref="scriptEditorRef"
    />
<!--    <RouterView/>-->
</template>
