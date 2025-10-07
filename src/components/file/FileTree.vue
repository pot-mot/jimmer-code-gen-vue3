<script setup lang="ts">
import {ref, watch} from 'vue'
import SelectableTree from "@/components/tree/SelectableTree.vue";
import type {TreeNode} from "@/components/tree/TreeNode.ts";

const props = defineProps<{
    paths: Iterable<string>,
    currentPath: string | undefined,
}>()

const emit = defineEmits<{
    (event: "dir-click", path: string): void
    (event: "file-click", path: string): void
}>()

type FileTreeNode = TreeNode<{
    path: string,
    name: string,
}>

const treeData = ref<FileTreeNode[]>([])

const buildTree = (paths: Iterable<string>): FileTreeNode[] => {
    const trees: FileTreeNode[] = []

    for (const path of paths) {
        let normalizedPath = path
        if (path.startsWith("/")) normalizedPath = path.substring(1)

        const pathParts = normalizedPath.split('/')

        let currentPath: string = ''
        let currentLevel: FileTreeNode[] = trees

        for (const part of pathParts) {
            currentPath += '/' + part

            // 查找当前层级是否已经存在该部分
            const findNode = currentLevel.find(item => item.data.name === part)

            if (findNode === undefined) {
                // 如果不存在，则创建一个新的节点
                const currentChildren: FileTreeNode[] = []
                const newNode: FileTreeNode = {id: currentPath, data: {name: part, path: currentPath}, children: currentChildren}
                currentLevel.push(newNode)
                currentLevel = currentChildren
            } else {
                // 更新当前层级为新节点的子节点
                if (findNode.children === undefined) {
                    findNode.children = []
                }
                currentLevel = findNode.children
            }
        }
    }

    return sortFilePathTree(trees)
}

const sortFilePathTree = (files: Array<FileTreeNode>): Array<FileTreeNode> => {
    const withChildren: Array<FileTreeNode> = []
    const noChildren: Array<FileTreeNode> = []
    for (const file of files.sort((a, b) => a.data.name.localeCompare(b.data.name))) {
        if (file.children && file.children.length > 0) {
            const sortedChildren = sortFilePathTree(file.children)
            withChildren.push({...file, children: sortedChildren})
        } else {
            noChildren.push(file)
        }
    }
    return [...withChildren, ...noChildren]
}

const handleFileClick = (node: FileTreeNode) => {
    if (node.children === undefined || node.children.length === 0) emit('file-click', node.data.path)
    else emit('dir-click', node.data.path)
}

watch(() => props.paths, async () => {
    treeData.value = buildTree(props.paths)
}, {immediate: true})
</script>

<template>
    <SelectableTree
        :data="treeData"
    >
        <template #default="{data, node}">
            <div
                class="file-tree-node"
                :class="{current: data.path === props.currentPath}"
                @click="handleFileClick(node)"
            >
                <div v-if="data.name">{{ data.name }}</div>
                <div v-else>[Empty Name]</div>
            </div>
        </template>
    </SelectableTree>
</template>

<style scoped>
.file-tree-node {
    width: 100%;
}
</style>
