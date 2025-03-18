<script setup lang="ts">
import {GenerateTag_CONSTANTS} from "@/api/__generated/model/enums";
import {CodeFilterData} from "@/store/modelEditor/MultiCodePreviewStore.ts";
import {TableEntityNotNullPair} from "@/api/__generated/model/static";

const data = defineModel<CodeFilterData>({
    required: true
})

defineProps<{
    tableEntityPairOptions: Array<TableEntityNotNullPair>
}>()
</script>

<template>
    <el-input
        v-model="data.path"
        clearable
        placeholder="Filter File"
        class="multi-code-preview-select"
        autosize
        :spellcheck="false"
    />

    <el-input
        v-model="data.content"
        clearable
        placeholder="Filter Content"
        class="multi-code-preview-select"
        autosize
        :spellcheck="false"
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
