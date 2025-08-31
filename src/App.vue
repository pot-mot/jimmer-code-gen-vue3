<script setup lang="ts">
import {initDeviceStore} from "@/store/deviceStore.ts";
import {initThemeStore} from "@/store/themeStore.ts";
import {initFocusTargetStore} from "@/store/focusTargetStore.ts";
import {ref, useTemplateRef} from "vue";
import DiffTsScriptEditor from "@/components/code/scriptEditor/DiffTsScriptEditor.vue";
import {createTsScript, type TsScript, TsScriptExecutor} from "@/components/code/scriptEditor/TsScriptExecutor.ts";

initDeviceStore()
initThemeStore()
initFocusTargetStore()

const lazyShow = ref(false)
setTimeout(() => {
    lazyShow.value = true
}, 1000)

const editorRef = useTemplateRef('editorRef')

const executor = new TsScriptExecutor<TableGenerator>(
    'TableGenerator'
)

let script: TsScript<TableGenerator>

const execute = async () => {
    if (script && script.valid) {
        const result = script.execute({
            name: 'table',
            comment: 'comment',
            columns: [],
            indexes: [],
        })
        alert(result)
    } else {
        if (!editorRef) return
        const value = editorRef?.value?.modifiedModel?.getValue()
        if (!value) return
        script = await createTsScript<TableGenerator>('TableGenerator', value, executor)
        if (!script.valid) return
        const result = script.execute({
            name: 'table',
            comment: 'comment',
            columns: [],
            indexes: [],
        })
        alert(result)
    }
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
