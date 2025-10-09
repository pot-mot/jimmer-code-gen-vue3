<script setup lang="ts">
import Splitpanes from "@/components/splitpanes/Splitpanes.vue";
import Pane from "@/components/splitpanes/Pane.vue";
import CodePreview from "@/components/code/CodePreview.vue";
import FileTree from "@/components/file/FileTree.vue";
import {computed, ref} from "vue";

const props = defineProps<{
    files: Record<string, string>
}>()

const paths = computed(() => Object.keys(props.files))

const currentPath = ref<string>()

const currentFileContent = computed(() => {
    if (currentPath.value !== undefined) {
        return props.files[currentPath.value]
    }
})

const currentLanguage = computed(() => {
    const splitParts = currentPath.value?.split(".")
    if (splitParts && splitParts.length > 0) {
        return splitParts[splitParts.length - 1]
    }
})

const handleFileClick = (path: string) => {
    currentPath.value = path
}
</script>

<template>
    <Splitpanes>
        <Pane size="20">
            <div class="pane-content">
                <slot name="left-top"/>
                <FileTree
                    :paths="paths"
                    :current-path="currentPath"
                    @file-click="handleFileClick"
                />
            </div>
        </Pane>
        <Pane>
            <div class="pane-content">
                <CodePreview
                    v-if="currentFileContent !== undefined && currentLanguage !== undefined"
                    :code="currentFileContent"
                    :language="currentLanguage"
                />
            </div>
        </Pane>
    </Splitpanes>
</template>

<style scoped>
.pane-content {
    height: 100%;
    width: 100%;
    padding: 0.5rem;
    overflow: auto;
}
</style>