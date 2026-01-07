import {api} from "@/api";
import {readonly, ref} from "vue";
import type {ModelHistoryNoJsonView, ModelHistoryView} from "@/api/__generated/model/static";
import {useDialogOpenState} from "@/components/dialog/DialogOpenState.ts";
import {createStore} from "@/utils/store/createStore.ts";

export const useModelVersionDialog = createStore(() => {
    const versions = ref<ModelHistoryNoJsonView[]>([])

    const fetchVersions = async (modelId: string): Promise<ModelHistoryNoJsonView[]> => {
        versions.value = await api.modelService.fetchHistories({modelId, modelHistoryOrder: "MODIFIED_TIME_DESC"})
        return versions.value
    }

    const currentVersion = ref<ModelHistoryView | undefined>()

    const fetchCurrentVersion = async (versionId: string | undefined): Promise<ModelHistoryView | undefined> => {
        if (versionId === undefined) {
            currentVersion.value = undefined
        } else {
            currentVersion.value = await api.modelService.getHistory({modelHistoryId: versionId})
        }
        return currentVersion.value
    }

    return {
        ...useDialogOpenState(),
        versions: readonly(versions),
        fetchVersions,
        currentVersion: readonly(currentVersion),
        fetchCurrentVersion,
    }
})