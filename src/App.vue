<script setup lang="ts">
import {initDeviceStore} from "@/store/deviceStore.ts";
import {initThemeStore} from "@/store/themeStore.ts";
import {initFocusTargetStore} from "@/store/focusTargetStore.ts";
import {ref, useTemplateRef} from "vue";
import TsScriptEditor from "@/components/code/scriptEditor/TsScriptEditor.vue";
import {TsScriptExecutor} from "@/components/code/scriptEditor/TsScriptExecutor.ts";

initDeviceStore()
initThemeStore()
initFocusTargetStore()

const lazyShow = ref(false)
setTimeout(() => {
    lazyShow.value = true
}, 1000)

const editor1Ref = useTemplateRef('editor1Ref')
const editor2Ref = useTemplateRef('editor2Ref')

const executor1 = new TsScriptExecutor<{
    (): string,
    returnTypeLiteral: 'string',
    paramTypesLiteral: [],
}>(
    'string',
    []
)

const executor2 = new TsScriptExecutor<{
    (a: number, b?: {type: string}): number,
    returnTypeLiteral: 'number',
    paramTypesLiteral: ['number', '{type: string}'],
}>(
    'number',
    ['number', '{type: string}']
)

const execute1 = () => {
    editor1Ref.value?.executeCode([]).then(it => {
        alert(JSON.stringify(it))
    })
}

const execute2 = () => {
    editor2Ref.value?.executeCode([1, {type: 'ok'}]).then(it => {
        alert(JSON.stringify(it))
    })
}
</script>

<template>
    <button @click="execute1">execute</button>
    <div style="height: 200px">
        <TsScriptEditor ref="editor1Ref" :executor="executor1"/>
    </div>

    <button @click="execute2">execute</button>
    <div style="height: 200px" v-if="lazyShow">
        <TsScriptEditor ref="editor2Ref" :executor="executor2"/>
    </div>

<!--    <RouterView/>-->
</template>
