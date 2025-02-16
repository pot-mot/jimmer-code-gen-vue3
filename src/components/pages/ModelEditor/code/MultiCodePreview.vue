<script lang="ts" setup>
import {computed, ref} from 'vue'
import CodePreview from "../../../global/code/CodePreview.vue";
import {GenerateFile} from "@/api/__generated/model/static";
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
import {useMultiCodePreviewStore} from "@/store/modelEditor/MultiCodePreviewStore.ts";

const i18nStore = useI18nStore()

const store = useMultiCodePreviewStore()

withDefaults(defineProps<{
    showLineCounts?: boolean
}>(), {
    showLineCounts: true
})

const emits = defineEmits<{
    (event: "downloadFile", file: GenerateFile): void
    (event: "downloadFiles", files: Array<GenerateFile>): void
}>()

const currentPath = ref<string>()

const handleFileClick = (path: string) => {
    currentPath.value = path
}

const currentFile = computed(() =>
    store.filteredFiles.find(it => it.path === currentPath.value)
)

const currentLanguage = computed<string>(() => {
    const splitParts = currentPath.value?.split(".")
    if (splitParts) {
        return splitParts[splitParts.length - 1]
    } else {
        return ''
    }
})

const handleDownloadCurrent = () => {
    if (currentFile.value !== undefined)
        emits("downloadFile", currentFile.value)
}

const handleDownloadFiltered = () => {
    emits("downloadFiles", store.filteredFiles)
}

const handleDownloadAll = () => {
    emits("downloadFiles", store.allFiles)
}

const paths = computed(() => store.filteredFiles.map(it => it.path))
</script>

<template>
    <LeftRightLayout :left-size="20">
        <template #left>
            <Splitpanes horizontal>
                <Pane style="overflow-y: scroll;" size="13em">
                    <GenerateFileFilter
                        v-model="store.filterData"
                        :table-entity-pair-options="store.codes.tableEntityPairs"
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
                        :table-id-map="store.tableIdMap"
                        :entity-id-map="store.entityIdMap"
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
                            v-if="store.filteredFiles.length !== store.allFiles.length"
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
</template>

<style scoped>
.code-download-button {
    position: absolute;
    bottom: 2em;
    right: 2em;
}
</style>
