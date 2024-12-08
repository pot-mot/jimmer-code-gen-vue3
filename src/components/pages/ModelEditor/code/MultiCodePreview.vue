<script lang="ts" setup>
import {computed, ref} from 'vue'
import CodePreview from "../../../global/code/CodePreview.vue";
import {GenerateFile} from "@/api/__generated/model/static";
import LeftRightLayout from "@/components/global/layout/LeftRightLayout.vue";
import {ElTree} from "element-plus";
import {GenerateTag, GenerateTag_CONSTANTS} from "@/api/__generated/model/enums";
import {Pane, Splitpanes} from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import GenerateFileAssociationMenu from "@/components/pages/ModelEditor/code/GenerateFileMenu.vue";

interface MultiCodePreviewProps {
    codeFiles: Array<GenerateFile> | undefined,
    width?: string
    height?: string
    showLineCounts?: boolean
}

const props = withDefaults(defineProps<MultiCodePreviewProps>(), {
    width: "100%",
    height: "100%",
    showLineCounts: true
})

const treeRef = ref<InstanceType<typeof ElTree>>()

const currentPath = ref<string | undefined>(props.codeFiles?.[0]?.path)

const currentLanguage = computed<string>(() => {
    const splitParts = currentPath.value?.split(".")
    if (splitParts) {
        return splitParts[splitParts.length - 1]
    } else {
        return ''
    }
})

const currentFile = computed(() =>
    props.codeFiles?.find(it => it.path === currentPath.value)
)

type FilePathTreeItem = {
    path: string | undefined,
    name: string,
    children: FilePathTreeItem[],
}

// 递归函数构建树形结构
const buildFilePathTree = (files: GenerateFile[]): FilePathTreeItem[] => {
    const trees: FilePathTreeItem[] = []

    files.forEach(file => {
        const {path} = file
        const parts = path.split('/')

        let currentLevel = trees;

        parts.forEach(part => {
            // 查找当前层级是否已经存在该部分
            let existingNode = currentLevel.find(item => item.name === part)

            if (!existingNode) {
                // 如果不存在，则创建一个新的节点
                existingNode = {name: part, children: [], path: path.endsWith(part) ? path : undefined}
                currentLevel.push(existingNode)
            }
            // 更新当前层级为新节点的子节点
            currentLevel = existingNode.children
        })
    })

    return trees
}

// 将文件路径转换成树形结构
const filterText = ref("")

const positiveTags = ref<GenerateTag[]>([])

const negativeTags = ref<GenerateTag[]>(['EditTable', 'IdMultiSelect'])

const getFilteredFiles = (): Array<GenerateFile> => {
    const filterWords = filterText.value.split(/\s+/).filter(it => it.length > 0)

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

    return props.codeFiles?.filter(it => {
        if (positiveWords.length > 0) {
            const inPositiveWords = positiveWords.every(word => it.path.includes(word))
            if (!inPositiveWords) return false
        }
        if (negativeWords.length > 0) {
            const inNegativeWords = negativeWords.some(word => it.path.includes(word))
            if (inNegativeWords) return false
        }
        if (positiveTags.value.length > 0) {
            const inPositiveTags = positiveTags.value.some(tag => it.tags.includes(tag))
            if (!inPositiveTags) return false
        }
        if (negativeTags.value.length > 0) {
            const inNegativeTags = negativeTags.value.some(tag => it.tags.includes(tag))
            if (inNegativeTags) return false
        }

        return true
    }) ?? []
}

const fileTree = ref<FilePathTreeItem[]>(buildFilePathTree(getFilteredFiles()))

const handleFiltered = () => {
    fileTree.value = buildFilePathTree(getFilteredFiles())
}

defineExpose<{
    getFilteredFiles: () => Array<GenerateFile>
}>({
    getFilteredFiles
})
</script>

<template>
    <LeftRightLayout v-if="codeFiles && codeFiles.length > 0" :left-size="20">
        <template #left>
            <Splitpanes horizontal>
                <Pane style="overflow-y: scroll;" size="11em">
                    <el-input
                        v-model="filterText" clearable
                        placeholder="Filter Keyword"
                        style="width: calc(100% - 1rem);"
                        autosize
                        @change="handleFiltered"
                        :spellcheck="false"
                    />

                    <el-select
                        v-model="positiveTags" multiple filterable clearable
                        placeholder="Select Tag"
                        collapse-tags
                        collapse-tags-tooltip
                        :max-collapse-tags="6"
                        style="width: calc(100% - 1rem); margin-top: 0.3rem;"
                        @change="handleFiltered">
                        <el-option
                            v-for="tag in GenerateTag_CONSTANTS"
                            :value="tag"/>
                    </el-select>

                    <el-select
                        v-model="negativeTags" multiple filterable clearable
                        placeholder="Select Negative Tag"
                        collapse-tags
                        collapse-tags-tooltip
                        :max-collapse-tags="6"
                        style="width: calc(100% - 1rem); margin-top: 0.3rem;"
                        @change="handleFiltered">
                        <el-option
                            v-for="tag in GenerateTag_CONSTANTS"
                            :value="tag"/>
                    </el-select>
                </Pane>
                <Pane style="overflow-y: scroll;">
                    <el-tree
                        ref="treeRef"
                        :props="{children: 'children'}"
                        :data="fileTree"
                        :indent="6"
                        @node-click="(data: FilePathTreeItem) => {if (data.path) currentPath = data.path}">
                        <template #default="{data}">
                            <el-text>{{ data.name }}</el-text>
                        </template>
                    </el-tree>
                </Pane>
            </Splitpanes>
        </template>

        <template #right v-if="currentFile">
            <Splitpanes horizontal>
                <Pane style="overflow-y: scroll;" size="3em">
                    <GenerateFileAssociationMenu
                        :file="currentFile"
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
        </template>
    </LeftRightLayout>

    <el-empty v-else/>
</template>
