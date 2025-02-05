<script setup lang="ts">
import {ref, watch} from 'vue'
import {ElTree} from "element-plus";

const props = defineProps<{
    paths: string[],
    currentPath: string | undefined,
}>()

const emit = defineEmits<{
    (event: "file-click", path: string): void
}>()

type FilePathTreeItem = {
    path: string,
    name: string,
    children: FilePathTreeItem[],
}

const treeData = ref<FilePathTreeItem[]>()

// 构建树形结构
const buildTree = (paths: string[]): FilePathTreeItem[] => {
    const trees: Array<FilePathTreeItem> = []

    paths.forEach(path => {
        const pathParts = path.split('/')

        let currentPath: string = ''
        let currentLevel: Array<FilePathTreeItem> = trees

        pathParts.forEach(part => {
            if (currentPath.length !== 0) currentPath += '/'
            currentPath += part

            // 查找当前层级是否已经存在该部分
            const findNode = currentLevel.find(item => item.name === part)

            if (findNode === undefined) {
                // 如果不存在，则创建一个新的节点
                const newNode: FilePathTreeItem = {name: part, children: [], path: currentPath}
                currentLevel.push(newNode)
                currentLevel = newNode.children
            } else {
                // 更新当前层级为新节点的子节点
                currentLevel = findNode.children
            }
        })
    })

    return sortFilePathTree(trees)
}

const sortFilePathTree = (files: Array<FilePathTreeItem>): Array<FilePathTreeItem> => {
    const withChildren: Array<FilePathTreeItem> = []
    const noChildren: Array<FilePathTreeItem> = []
    for (const file of files.sort((a, b) => a.name.localeCompare(b.name))) {
        if (file.children.length > 0) {
            const sortedChildren = sortFilePathTree(file.children)
            withChildren.push({...file, children: sortedChildren})
        } else {
            noChildren.push(file)
        }
    }
    return [...withChildren, ...noChildren]
}

const handleFileClick = (data: FilePathTreeItem) => {
    if (data.children.length === 0) emit('file-click', data.path)
}

const expandKeySet = ref<Set<string>>(new Set<string>)

const handleNodeExpand = (data: FilePathTreeItem) => {
    expandKeySet.value.add(data.path)
}

const handleNodeCollapse = (data: FilePathTreeItem) => {
    expandKeySet.value.delete(data.path)
}

watch(() => props.paths, () => {
    treeData.value = buildTree(props.paths)
}, {immediate: true})
</script>

<template>
    <el-tree
        :props="{children: 'children'}"
        :data="treeData"
        :indent="16"
        node-key="path"
        :default-expanded-keys="[...expandKeySet]"
        @node-click="handleFileClick"
        @node-expand="handleNodeExpand"
        @node-collapse="handleNodeCollapse"
    >
        <template #default="{data}">
            <el-text :class="{ current: data.path === currentPath }">
                {{ data.name }}
            </el-text>
        </template>
    </el-tree>
</template>

<style scoped>
.current {
    color: var(--el-color-primary);
}
</style>