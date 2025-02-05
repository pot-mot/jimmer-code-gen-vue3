<script lang="ts" setup>
import {computed, ref} from 'vue'
import CodePreview from "../../../global/code/CodePreview.vue";
import {GenerateFile, GenerateResult, TableEntityNotNullPair} from "@/api/__generated/model/static";
import LeftRightLayout from "@/components/global/layout/LeftRightLayout.vue";
import {Pane, Splitpanes} from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import GenerateFileMenu from "@/components/pages/ModelEditor/code/GenerateFileMenu.vue";
import GenerateFileFilter from "@/components/pages/ModelEditor/code/GenerateFileFilter.vue";
import FileTree from "@/components/global/file/FileTree.vue";
import DownloadIcon from "@/components/global/icons/toolbar/DownloadIcon.vue";

interface MultiCodePreviewProps {
    codes: GenerateResult,
    width?: string
    height?: string
    showLineCounts?: boolean
}

const props = withDefaults(defineProps<MultiCodePreviewProps>(), {
    width: "100%",
    height: "100%",
    showLineCounts: true
})

const emits = defineEmits<{
    (event: "download", files: Array<GenerateFile>): void
}>()

const files = ref<Array<GenerateFile>>([])
const paths = ref<Array<string>>([])

const handleFiltered = (filteredFiles: Array<GenerateFile>) => {
    files.value = filteredFiles
    paths.value = filteredFiles.map(it => it.path)
}

const currentPath = ref<string>()

const handleFileClick = (path: string) => {
    currentPath.value = path
}

const currentFile = computed(() =>
    props.codes.files.find(it => it.path === currentPath.value)
)

const currentLanguage = computed<string>(() => {
    const splitParts = currentPath.value?.split(".")
    if (splitParts) {
        return splitParts[splitParts.length - 1]
    } else {
        return ''
    }
})

const tableIdMap = computed(() => {
    const map = new Map<number, TableEntityNotNullPair>
    for (const pair of props.codes.tableEntityPairs) {
        map.set(pair.table.id, pair)
    }
    return map
})

const entityIdMap = computed(() => {
    const map = new Map<number, TableEntityNotNullPair>
    for (const pair of props.codes.tableEntityPairs) {
        map.set(pair.entity.id, pair)
    }
    return map
})

const handleDownload = () => {
    emits("download", files.value)
}
</script>

<template>
    <LeftRightLayout
        v-if="codes && codes.files.length > 0"
        :left-size="20"
        class="multi-code-preview"
    >
        <template #left>
            <Splitpanes horizontal>
                <Pane style="overflow-y: scroll;" size="13em">
                    <GenerateFileFilter
                        :codes="codes"
                        @filtered="handleFiltered"
                    />
                </Pane>

                <Pane style="overflow-y: scroll;">
                    <FileTree
                        :paths="paths"
                        :current-path="currentPath"
                        @file-click="handleFileClick"
                    />
                </Pane>
            </Splitpanes>
        </template>

        <template #right v-if="currentFile">
            <Splitpanes horizontal>
                <Pane style="overflow-y: scroll;" size="3em">
                    <GenerateFileMenu
                        :file="currentFile"
                        :table-id-map="tableIdMap"
                        :entity-id-map="entityIdMap"
                    />
                </Pane>

                <Pane>
                    <CodePreview
                        :code="currentFile.content"
                        :language="currentLanguage"
                        :show-line-counts="showLineCounts"
                    />

                    <div class="code-download-button">
                        <el-button
                            :icon="DownloadIcon"
                            round
                            size="large"
                            @click="handleDownload"
                        />
                    </div>
                </Pane>
            </Splitpanes>
        </template>
    </LeftRightLayout>

    <el-empty v-else/>
</template>

<style scoped>
.multi-code-preview {
    height: calc(100vh - 30px);
    width: 100%;
}

.code-download-button {
    position: absolute;
    bottom: 2em;
    right: 2em;
}
</style>
