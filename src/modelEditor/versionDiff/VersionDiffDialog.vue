<script setup lang="ts">
import DragResizeDialog from "@/components/dialog/DragResizeDialog.vue";
import {useVersionDiffDialog} from "@/modelEditor/versionDiff/useVersionDiffDialog.ts";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {withLoading} from "@/components/loading/loadingApi.ts";
import VersionSelect from "@/modelEditor/versionDiff/VersionSelect.vue";
import type {ModelHistoryNoJsonView} from "@/api/__generated/model/static";
import {ref, watch} from "vue";
import {translate} from "@/store/i18nStore.ts";
import ObjectDiffView from "@/components/diff/ObjectDiffView.vue";

const {
    openState,
    refreshVersions,
    versions,
    resetDiff,
    diff,
} = useVersionDiffDialog()

const {contextData} = useModelEditor()

const version1 = ref<ModelHistoryNoJsonView | 'current'>('current')
const version2 = ref<ModelHistoryNoJsonView | 'current'>('current')

const handleOpen = () => {
    withLoading("Fetch Versions", async () => {
        const versions = await refreshVersions(contextData.model.id)
        const firstVersion = versions[0]
        if (firstVersion !== undefined) {
            version1.value = firstVersion
            await resetDiff(firstVersion, version2.value)
        }
    })
}

watch(() => [version1.value, version2.value], async () => {
    await resetDiff(version1.value, version2.value)
})
</script>

<template>
    <DragResizeDialog
        v-model="openState"
        can-resize
        modal
        @open="handleOpen"
        :init-w="700"
    >
        <template #title>
            {{ translate("history_version") }}
        </template>

        <div class="version-diff-container">
            <div class="diff-version-select">
                <VersionSelect
                    v-model="version1"
                    :versions="versions"
                />
                <VersionSelect
                    v-model="version2"
                    :versions="versions"
                />
            </div>

            <div class="diff-view" v-if="diff">
                <ObjectDiffView v-if="diff.model && diff.model.type !== 'circular reference'" :diff="diff.model"/>
                <ObjectDiffView v-if="diff.subData && diff.subData.type !== 'circular reference'" :diff="diff.subData"/>
                <ObjectDiffView v-if="diff.viewport && diff.viewport.type !== 'circular reference'" :diff="diff.viewport"/>
            </div>
            <div v-else>
                No version selected
            </div>
        </div>
    </DragResizeDialog>
</template>

<style scoped>
.version-diff-container {
    height: 100%;
    width: 100%;
    padding: 0.5rem;
    overflow: hidden;
}

.diff-view {
    height: calc(100% - 4rem);
    width: 100%;
    overflow: auto;
    margin-top: 0.5rem;
}

.diff-version-select {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5rem;
}
</style>