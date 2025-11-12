<script setup lang="ts">
import {ref, watch} from 'vue'
import SelectableTree from "@/components/tree/SelectableTree.vue";
import type {TreeNode} from "@/components/tree/TreeNode.ts";

const props = defineProps<{
    paths: Iterable<string>,
}>()

const currentPath = defineModel<string>('currentPath', {
    required: false
})
const currentFilePath = defineModel<string>('currentFilePath', {
    required: false
})

const emit = defineEmits<{
    (event: "dir-click", path: string): void
    (event: "file-click", path: string): void
}>()

type FileTreeNode = TreeNode<{
    path: string,
    name: string,
}>

const treeData = ref<FileTreeNode[]>([])
const selectedIdSet = ref(new Set<string>())

const buildTree = (paths: Iterable<string>): FileTreeNode[] => {
    const trees: FileTreeNode[] = []

    for (const path of paths) {
        const pathParts = path.split('/').filter(it => it.length > 0)

        let currentPath: string = ''
        let currentLevel: FileTreeNode[] = trees

        for (let i = 0; i < pathParts.length; i++) {
            const part = pathParts[i]
            if (part === undefined) continue
            if (i === pathParts.length - 1) {
                currentPath = path
            } else {
                currentPath += '/' + part
            }

            // 查找当前层级是否已经存在该部分
            const findNode = currentLevel.find(item => item.data.name === part)

            if (findNode === undefined) {
                // 如果不存在，则创建一个新的节点
                const currentChildren: FileTreeNode[] = []
                const newNode: FileTreeNode = {
                    id: currentPath,
                    data: {name: part, path: currentPath},
                    children: currentChildren
                }
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

    const sortedTree = sortFilePathTree(trees)

    const firstFileNode = findFirstFileNode(sortedTree)
    if (firstFileNode) {
        currentPath.value = firstFileNode.data.path
        currentFilePath.value = firstFileNode.data.path
        selectedIdSet.value = new Set([currentPath.value])
    }

    return sortedTree
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

const findFirstFileNode = (nodes: FileTreeNode[]): FileTreeNode | undefined => {
    for (const node of nodes) {        // 如果节点没有子节点，则为文件节点
        if (!node.children || node.children.length === 0) {
            return node
        }
        // 否则递归查找子节点
        const childResult = findFirstFileNode(node.children)
        if (childResult) {
            return childResult
        }
    }
}

const handleFileClick = (node: FileTreeNode) => {
    currentPath.value = node.data.path
    if (node.children === undefined || node.children.length === 0) {
        currentFilePath.value = node.data.path
        emit('file-click', node.data.path)
    } else {
        emit('dir-click', node.data.path)
    }
}

watch(() => props.paths, async () => {
    treeData.value = buildTree(props.paths)
}, {immediate: true})
</script>

<template>
    <SelectableTree
        :data="treeData"
        v-model:selected-id-set="selectedIdSet"
    >
        <template #default="{data, node}">
            <div
                class="file-tree-node"
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
