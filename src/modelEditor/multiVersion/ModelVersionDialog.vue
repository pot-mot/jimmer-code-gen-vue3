<script setup lang="ts">
import DragResizeDialog from "@/components/dialog/DragResizeDialog.vue";
import {useModelVersionDialog} from "@/modelEditor/multiVersion/useModelVersionDialog.ts";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {withLoading} from "@/components/loading/loadingApi.ts";
import VersionSelect from "@/modelEditor/multiVersion/VersionSelect.vue";
import type {ModelHistoryNoJsonView} from "@/api/__generated/model/static";
import {ref, watch} from "vue";
import VersionDiffView from "@/modelEditor/multiVersion/VersionDiffView.vue";

const {
    openState,
    fetchVersions,
    versions,
    fetchCurrentVersion,
    currentVersion,
} = useModelVersionDialog()

const {contextData, getModelGraphSubData} = useModelEditor()

const currentVersionNoJson = ref<ModelHistoryNoJsonView | undefined>()
watch(() => currentVersionNoJson.value, () => {
    fetchCurrentVersion(currentVersionNoJson.value?.id)
})

const handleOpened = () => {
    withLoading("", async () => {
        await fetchVersions(contextData.model.id)
    })
}
</script>

<template>
    <DragResizeDialog
        v-model="openState"
        can-resize
        modal
        @opened="handleOpened"
        :init-w="700"
    >
        <div class="version-diff-container">
            <VersionSelect
                v-model="currentVersionNoJson"
                :versions="versions"
            />
            <VersionDiffView
                class="diff-view"
                :current="getModelGraphSubData()"
                :version="currentVersion"
            />
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