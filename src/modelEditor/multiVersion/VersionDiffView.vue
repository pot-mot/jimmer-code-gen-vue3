<script setup lang="ts">
import type {ModelHistoryView} from "@/api/__generated/model/static";
import {computed} from "vue";
import {validatePartialModelGraphSubData} from "@/type/context/jsonSchema/PartialModelGraphSubData.ts";
import {fillModelGraphSubData} from "@/modelEditor/utils/ModelGraphSubData.ts";
import {versionDiff} from "@/modelEditor/multiVersion/versionDiff.ts";
import {jsonPrettyFormat} from "@/utils/json/jsonStringify.ts";
import CodeEditor from "@/components/code/CodeEditor.vue";

const props = defineProps<{
    current: ModelGraphSubData | undefined,
    version: ModelHistoryView | undefined
}>()

const parseGraphSubData = (json: string | undefined): ModelGraphSubData | undefined => {
    try {
        if (!json) return undefined

        const parsedJson = JSON.parse(json)
        if (validatePartialModelGraphSubData(parsedJson)) {
            return fillModelGraphSubData(parsedJson)
        } else {
            return undefined
        }
    } catch (e) {
        console.warn(e)
        return undefined
    }
}

const previousGraphSubData = computed(() => {
    return parseGraphSubData(props.version?.jsonData)
})

const diff = computed(() => {
    return versionDiff(props.current, previousGraphSubData.value)
})

const diffStr = computed(() => {
    return jsonPrettyFormat(diff.value)
})
</script>

<template>
    <CodeEditor
        v-if="current && previousGraphSubData"
        :model-value="diffStr"
        language="json"
        :options="{
            readOnly: true,
        }"
    />
</template>

<style scoped>

</style>