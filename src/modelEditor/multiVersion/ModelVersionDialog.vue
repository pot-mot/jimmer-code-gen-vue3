<script setup lang="ts">
import DragResizeDialog from "@/components/dialog/DragResizeDialog.vue";
import {useModelVersionDialog} from "@/modelEditor/multiVersion/useModelVersionDialog.ts";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {withLoading} from "@/components/loading/loadingApi.ts";
import VersionSelect from "@/modelEditor/multiVersion/VersionSelect.vue";
import type {ModelHistoryNoJsonView} from "@/api/__generated/model/static";
import {ref, watch} from "vue";
import VersionDiffView from "@/modelEditor/multiVersion/VersionDiffView.vue";
import {translate} from "@/store/i18nStore.ts";

const {
    openState,
    fetchVersions,
    versions,
    fetchCurrentVersion,
    currentVersion,
} = useModelVersionDialog()

const {contextData, getModelGraphData} = useModelEditor()

const currentModelGraphData = ref<ModelGraphData | undefined>()
const currentVersionNoJson = ref<ModelHistoryNoJsonView | undefined>()
watch(() => currentVersionNoJson.value, () => {
    fetchCurrentVersion(currentVersionNoJson.value?.id)
})

const handleOpen = () => {
    withLoading("Fetch Versions", async () => {
        currentModelGraphData.value = getModelGraphData()
        const versions = await fetchVersions(contextData.model.id)
        const firstVersion = versions[0]
        if (firstVersion !== undefined) {
            currentVersionNoJson.value = firstVersion
        }
    })
}
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
            <VersionSelect
                v-model="currentVersionNoJson"
                :versions="versions"
            />
            <VersionDiffView
                v-if="currentModelGraphData && currentVersion"
                class="diff-view"
                :current="currentModelGraphData"
                :version="currentVersion"
            />
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
</style>