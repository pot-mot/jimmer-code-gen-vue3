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
const selectedPathSet = ref<Set<string>>(new Set())

const currentFilePath = ref<string>()

const currentFileContent = computed(() => {
    if (currentFilePath.value !== undefined) {
        return props.files[currentFilePath.value]
    }
})

const currentLanguage = computed(() => {
    const splitParts = currentFilePath.value?.split(".")
    if (splitParts && splitParts.length > 0) {
        return splitParts[splitParts.length - 1]
    }
})
</script>

<template>
    <Splitpanes>
        <Pane size="20">
            <div class="pane-content">
                <slot
                    name="left-top"
                    :selectedPathSet="selectedPathSet"
                    :currentFileContent="currentFileContent"
                    :currentLanguage="currentLanguage"
                />
                <FileTree
                    :paths="paths"
                    v-model:current-file-path="currentFilePath"
                    v-model:selected-path-set="selectedPathSet"
                    style="padding-left: 0.5rem; overflow-x: auto;"
                />
            </div>
        </Pane>
        <Pane>
            <div class="pane-content">
                <CodePreview
                    v-if="currentFileContent !== undefined && currentLanguage !== undefined"
                    :code="currentFileContent"
                    :language="currentLanguage"
                    style="padding-left: 0.5rem;"
                />
            </div>
        </Pane>
    </Splitpanes>
</template>

<style scoped>
.pane-content {
    height: 100%;
    width: 100%;
    overflow: hidden;
}
</style>