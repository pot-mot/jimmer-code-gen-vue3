<script setup lang="ts">
import {initDeviceStore} from "@/store/deviceStore.ts";
import {initThemeStore} from "@/store/themeStore.ts";
import {initFocusTargetStore} from "@/store/focusTargetStore.ts";
import {ref, useTemplateRef} from "vue";
import DiffTsScriptEditor from "@/components/code/scriptEditor/DiffTsScriptEditor.vue";
import {TsScriptExecutor} from "@/components/code/scriptEditor/TsScriptExecutor.ts";

initDeviceStore()
initThemeStore()
initFocusTargetStore()

const lazyShow = ref(false)
setTimeout(() => {
    lazyShow.value = true
}, 1000)

const editorRef = useTemplateRef('editorRef')

const executor = new TsScriptExecutor<{
    (a: number, b?: MyType): number,
    returnTypeLiteral: 'number',
    paramTypesLiteral: ['number', 'MyType'],
}>(
    'number',
    ['number', 'MyType']
)

const execute = () => {
    editorRef.value?.executeCode([1]).then(it => {
        alert(JSON.stringify(it))
    })
}
</script>

<template>
    <button @click="execute">execute</button>
    <div style="height: 200px">
        <DiffTsScriptEditor
            ref="editorRef"
            :executor="executor"
            :origin-value="''"
        />
    </div>


    <!--    <RouterView/>-->
</template>
