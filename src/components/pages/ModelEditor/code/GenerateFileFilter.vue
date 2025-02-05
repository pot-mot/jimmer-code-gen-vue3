<script setup lang="ts">
import {computed, reactive, watch} from 'vue'
import {GenerateTag, GenerateTag_CONSTANTS} from "@/api/__generated/model/enums";
import {type GenerateFile, GenerateResult, IdName, TableEntityPair} from "@/api/__generated/model/static";

const props = defineProps<{
    codes: GenerateResult,
}>()

const emits = defineEmits<{
    (event: "filtered", data: Array<GenerateFile>): void
}>()

const data = reactive<{
    text: string
    mainPairs: Array<TableEntityPair>
    negativeMainPairs: Array<TableEntityPair>
    mainEnum: Array<IdName>
    subPairs: Array<TableEntityPair>
    subEnum: Array<IdName>
    positiveTags: Array<GenerateTag>
    negativeTags: Array<GenerateTag>
}>({
    text: '',
    mainPairs: [],
    negativeMainPairs: [],
    mainEnum: [],
    subPairs: [],
    subEnum: [],
    positiveTags: [],
    negativeTags: [],
})

const tableEntityPairOptions = computed(() => {
    return props.codes.tableEntityPairs.sort((a, b) => a.table.name.localeCompare(b.table.name))
})

const filterFiles = () => {
    const filterWords = data.text.split(/\s+/).filter(it => it.length > 0)

    const {positiveWords, negativeWords} = filterWords.reduce(
        (data: { positiveWords: string[], negativeWords: string[] }, word: string) => {
            if (word.startsWith('!')) {
                data.negativeWords.push(word.slice(1))
            } else {
                data.positiveWords.push(word)
            }
            return data
        },
        {positiveWords: [], negativeWords: []}
    )

    const filterTableIds = new Set(data.mainPairs.map(it => it.table?.id).filter(it => it !== undefined))
    const filterEntityIds = new Set(data.mainPairs.map(it => it.entity?.id).filter(it => it !== undefined))

    const filteredFiles = props.codes.files.filter(it => {
        if (data.mainPairs.length > 0) {
            if (!it.main) return false

            const {mainType, idName} = it.main
            if (mainType === "Table") {
                if (!filterTableIds.has(idName.id)) return false
            } else if (mainType === "Entity") {
                if (!filterEntityIds.has(idName.id)) return false
            } else {
                return false
            }
        }
        if (positiveWords.length > 0) {
            const inPositiveWords = positiveWords.every(word => it.path.includes(word))
            if (!inPositiveWords) return false
        }
        if (negativeWords.length > 0) {
            const inNegativeWords = negativeWords.some(word => it.path.includes(word))
            if (inNegativeWords) return false
        }
        if (data.positiveTags.length > 0) {
            const inPositiveTags = data.positiveTags.some(tag => it.tags.includes(tag))
            if (!inPositiveTags) return false
        }
        if (data.negativeTags.length > 0) {
            const inNegativeTags = data.negativeTags.some(tag => it.tags.includes(tag))
            if (inNegativeTags) return false
        }

        return true
    })

    emits("filtered", filteredFiles)
}

watch(() => props.codes, filterFiles, {immediate: true})
</script>

<template>
    <el-input
        v-model="data.text"
        clearable
        placeholder="Filter Keyword"
        class="multi-code-preview-select"
        autosize
        :spellcheck="false"
        @change="filterFiles"
    />

    <el-select
        v-model="data.mainPairs"
        multiple filterable clearable
        placeholder="Select Main Table-Entity Pair"
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="6"
        class="multi-code-preview-select"
        value-key="table.name"
        @change="filterFiles"
    >
        <el-option
            v-for="pair in tableEntityPairOptions"
            :value="pair"
            :label="`${pair.table.name} - ${pair.entity.name}`"
        />
    </el-select>

    <el-select
        v-model="data.positiveTags" multiple filterable clearable
        placeholder="Select Tag"
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="6"
        class="multi-code-preview-select"
        @change="filterFiles"
    >
        <el-option
            v-for="tag in GenerateTag_CONSTANTS"
            :value="tag"
        />
    </el-select>

    <el-select
        v-model="data.negativeTags"
        multiple filterable clearable
        placeholder="Select Negative Tag"
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="6"
        class="multi-code-preview-select"
        @change="filterFiles"
    >
        <el-option
            v-for="tag in GenerateTag_CONSTANTS"
            :value="tag"
        />
    </el-select>
</template>

<style scoped>
.multi-code-preview-select {
    width: calc(100% - 1rem);
}

.multi-code-preview-select + .multi-code-preview-select {
    margin-top: 0.3rem;
}
</style>
