<script setup lang="ts">
import {initDeviceStore} from "@/store/deviceStore.ts";
import {initThemeStore} from "@/store/themeStore.ts";
import {initFocusTargetStore} from "@/store/focusTargetStore.ts";
import TsScriptEditor from "@/components/code/templateEditor/TsScriptEditor.vue";
import {TsScriptExecutor} from "@/components/code/templateEditor/ts-script-executor.ts";
import {useTemplateRef} from "vue";

initDeviceStore()
initThemeStore()
initFocusTargetStore()

const executor1 = new TsScriptExecutor<{
    (params: MyType): string,
    returnTypeLiteral: 'string',
    paramTypesLiteral: ['MyType'],
    typeDeclares: {},
}>(
    'string',
    ['MyType'],
)

const executor2 = new TsScriptExecutor<{
    (params: MyType): string,
    returnTypeLiteral: 'string',
    paramTypesLiteral: ['MyType'],
    typeDeclares: {},
}>(
    'string',
    ['MyType'],
)

const scriptEditorRef1 = useTemplateRef('scriptEditorRef1')

const executeCode1 = async () => {
    const result = await scriptEditorRef1.value?.executeCode([{
        name: "the"
    }])
    alert(JSON.stringify(result))
}

const scriptEditorRef2 = useTemplateRef('scriptEditorRef2')

const executeCode2 = async () => {
    const result = await scriptEditorRef2.value?.executeCode([{
        name: "ok"
    }])
    alert(JSON.stringify(result))
}
</script>

<template>
    <button @click="executeCode1">execute1</button>
    <div style="height: 200px">
        <TsScriptEditor
            :executor="executor1"
            ref="scriptEditorRef1"
        />
    </div>

    <button @click="executeCode2">execute2</button>
    <div style="height: 200px">
        <TsScriptEditor
            :executor="executor2"
            ref="scriptEditorRef2"
        />
    </div>

<!--    <RouterView/>-->
</template>
