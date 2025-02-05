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

// 递归函数构建树形结构
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
                const newNode = {name: part, children: [], path: currentPath}
                currentLevel.push(newNode)
                currentLevel = newNode.children
            } else {
                // 更新当前层级为新节点的子节点
                currentLevel = findNode.children
            }
        })
    })

    return trees
}

const handleFileClick = (data: FilePathTreeItem) => {
    if (data.path) emit('file-click', data.path)
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
        @node-click="handleFileClick">
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