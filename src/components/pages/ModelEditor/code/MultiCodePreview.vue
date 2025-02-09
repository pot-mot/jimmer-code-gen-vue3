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
import DownloadIcon from "@/components/global/icons/download/DownloadIcon.vue";
import DownloadFileIcon from "@/components/global/icons/download/DownloadFileIcon.vue";
import DownloadWithFilterIcon from "@/components/global/icons/download/DownloadWithFilterIcon.vue";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";

const i18nStore = useI18nStore()

interface MultiCodePreviewProps {
    codes: GenerateResult,
    showLineCounts?: boolean
}

const props = withDefaults(defineProps<MultiCodePreviewProps>(), {
    showLineCounts: true
})

const emits = defineEmits<{
    (event: "downloadFile", file: GenerateFile): void
    (event: "downloadFiles", files: Array<GenerateFile>): void
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

const handleDownloadCurrent = () => {
    if (currentFile.value !== undefined)
        emits("downloadFile", currentFile.value)
}

const handleDownloadFiltered = () => {
    emits("downloadFiles", files.value)
}

const handleDownloadAll = () => {
    emits("downloadFiles", props.codes.files)
}
</script>

<template>
    <LeftRightLayout
        v-if="codes && codes.files.length > 0"
        :left-size="20"
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

        <template #right>
            <Splitpanes horizontal v-if="currentFile">
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
                </Pane>
            </Splitpanes>

            <div class="code-download-button">
                <el-tooltip :content="i18nStore.translate('LABEL_ModelEditorGraph_downloadFiltered')"
                            v-if="codes.files.length !== paths.length"
                >
                    <el-button
                        :icon="DownloadWithFilterIcon"
                        round
                        size="large"
                        @click="handleDownloadFiltered"
                    />
                </el-tooltip>

                <el-tooltip :content="i18nStore.translate('LABEL_ModelEditorGraph_downloadCurrent')"
                            v-if="currentFile">
                    <el-button
                        :icon="DownloadFileIcon"
                        round
                        size="large"
                        @click="handleDownloadCurrent"
                    />
                </el-tooltip>

                <el-tooltip :content="i18nStore.translate('LABEL_ModelEditorGraph_downloadAll')">
                    <el-button
                        :icon="DownloadIcon"
                        round
                        size="large"
                        @click="handleDownloadAll"
                    />
                </el-tooltip>
            </div>
        </template>
    </LeftRightLayout>

    <el-empty v-else/>
</template>

<style scoped>
.code-download-button {
    position: absolute;
    bottom: 2em;
    right: 2em;
}
</style>
