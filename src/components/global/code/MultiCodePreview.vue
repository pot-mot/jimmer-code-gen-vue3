<script lang="ts" setup>
import {computed, type ComputedRef, ref} from 'vue'
import CodePreview from "./CodePreview.vue";
import {GenerateFile} from "@/api/__generated/model/static";
import LeftRightLayout from "@/components/global/layout/LeftRightLayout.vue";
import {ElTree} from "element-plus";
import {GenerateTag, GenerateTag_CONSTANTS} from "@/api/__generated/model/enums";

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

const currentContent = computed(() => props.codeFiles?.find(it => it.path === currentPath.value)?.content)

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
                existingNode = { name: part, children: [], path: path.endsWith(part) ? path : undefined }
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

const filterTags = ref<GenerateTag[]>([])

const filteredFiles = computed(() =>
    props.codeFiles?.filter(it =>
        it.path.includes(filterText.value) &&
        (
            filterTags.value.length == 0 ||
            it.tags.some(tag => filterTags.value.includes(tag))
        )
    ) ?? []
)

const fileTree = computed<FilePathTreeItem[]>(() =>
    buildFilePathTree(filteredFiles.value)
)

defineExpose<{
    filteredFiles: ComputedRef<Array<GenerateFile>>
}>({
    filteredFiles
})
</script>

<template>
	<LeftRightLayout v-if="codeFiles && codeFiles.length > 0" :left-size="20">
		<template #left>
			<div style="padding: 0.5em;height: 100%; overflow-y: auto;">
                <el-input
                    v-model="filterText" clearable
                    style="width: calc(100% - 1rem);"
                    placeholder="Filter Keyword"
                />

                <el-select
                    v-model="filterTags" multiple clearable
                    style="width: calc(100% - 1rem);"
                    placeholder="Select Tag">
                    <el-option
                        v-for="tag in GenerateTag_CONSTANTS"
                        :value="tag"/>
                </el-select>

                <el-tree
                    ref="treeRef"
                    :props="{children: 'children'}"
                    :data="fileTree"
                    :indent="6">
                    <template #default="{data}">
                        <div @click="currentPath = data.path">
                            <el-button link>
                                {{ data.name }}
                            </el-button>
                        </div>
                    </template>
                </el-tree>
			</div>
		</template>

		<template #right v-if="currentContent">
			<CodePreview :code="currentContent"
						 :language="currentLanguage"
						 :show-line-counts="showLineCounts"/>
		</template>
	</LeftRightLayout>
	<el-empty v-else/>
</template>
