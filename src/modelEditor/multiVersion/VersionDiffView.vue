<script setup lang="ts">
import type {ModelHistoryView} from "@/api/__generated/model/static";
import {computed} from "vue";
import {validatePartialModelGraphSubData} from "@/type/context/jsonSchema/PartialModelGraphSubData.ts";
import {fillModelGraphSubData} from "@/modelEditor/utils/ModelGraphSubData.ts";
import {versionDiff} from "@/modelEditor/multiVersion/versionDiff.ts";
import ObjectDiffView from "@/components/diff/ObjectDiffView.vue";

const props = defineProps<{
    current: ModelGraphData | undefined,
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
    return versionDiff(
        {
            model: {
                name: props.version?.name,
                description: props.version?.description,
                databaseType: props.version?.databaseType,
                databaseNameStrategy: props.version?.databaseNameStrategy,
                defaultForeignKeyType: props.version?.defaultForeignKeyType,
                jvmLanguage: props.version?.jvmLanguage,
                defaultEnumerationStrategy: props.version?.defaultEnumerationStrategy,
            },
            viewport: props.version?.viewport,
            subData: previousGraphSubData.value
        },
        props.current
    )
})
</script>

<template>
    <div>
        <div>
            <div>Model</div>
            <ObjectDiffView v-if="diff.model.type === 'object'" :diff="diff.model" style="padding-left: 0.5rem;"/>
        </div>
        <ObjectDiffView v-if="diff.subData.type === 'object'" :diff="diff.subData"/>
        <div>
            <div>Viewport</div>
            <ObjectDiffView v-if="diff.viewport.type === 'object'" :diff="diff.viewport" style="padding-left: 0.5rem;"/>
        </div>
    </div>
</template>
