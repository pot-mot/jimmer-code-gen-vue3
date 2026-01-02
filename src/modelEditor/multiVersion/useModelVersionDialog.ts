import {api} from "@/api";
import {ref} from "vue";
import type {ModelHistoryNoJsonView, ModelHistoryView} from "@/api/__generated/model/static";
import {useDialogOpenState} from "@/components/dialog/DialogOpenState.ts";
import {createStore} from "@/utils/store/createStore.ts";

export const useModelVersionDialog = createStore(() => {
    const versions = ref<ModelHistoryNoJsonView[]>([])

    const fetchVersions = async (modelId: string) => {
        versions.value = await api.modelService.fetchHistories({modelId})
    }

    const currentVersion = ref<ModelHistoryView | undefined>()

    const fetchCurrentVersion = async (versionId: string | undefined) => {
        if (versionId === undefined) {
            currentVersion.value = undefined
        } else {
            currentVersion.value = await api.modelService.getHistory({modelHistoryId: versionId})
        }
    }

    return {
        ...useDialogOpenState(),
        versions,
        fetchVersions,
        currentVersion,
        fetchCurrentVersion,
    }
})