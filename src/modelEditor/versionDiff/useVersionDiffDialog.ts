import {api} from "@/api";
import {readonly, ref} from "vue";
import type {ModelHistoryNoJsonView, ModelHistoryView} from "@/api/__generated/model/static";
import {useDialogOpenState} from "@/components/dialog/DialogOpenState.ts";
import {createStore} from "@/utils/store/createStore.ts";
import {
    graphDataToDiffInput,
    type ModelDiffInput,
    type ModelVersionDiff, modelVersionDiff, versionViewToDiffInput
} from "@/modelEditor/versionDiff/versionDiff.ts";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";

export const useVersionDiffDialog = createStore(() => {
    const {getModelGraphData} = useModelEditor()

    const versions = ref<ModelHistoryNoJsonView[]>([])

    const refreshVersions = async (modelId: string): Promise<ModelHistoryNoJsonView[]> => {
        versions.value = await api.modelService.fetchHistories({modelId, modelHistoryOrder: "MODIFIED_TIME_DESC"})
        return versions.value
    }

    const fetchVersion = async (versionId: string | undefined): Promise<ModelHistoryView | undefined> => {
        if (versionId !== undefined) {
            return await api.modelService.getHistory({modelHistoryId: versionId})
        }
    }

    const diff = ref<ModelVersionDiff>()

    const resetDiff = async (
        version1: { id: string } | 'current' | undefined,
        version2: { id: string } | 'current' | undefined
    ) => {
        let diffInput1: ModelDiffInput | undefined = undefined
        let diffInput2: ModelDiffInput | undefined = undefined
        let currentGraphDataDiffInput: ModelDiffInput | undefined = undefined

        if (version1 !== undefined) {
            if (version1 === 'current') {
                currentGraphDataDiffInput = graphDataToDiffInput(getModelGraphData())
                diffInput1 = currentGraphDataDiffInput
            } else if ("id" in version1) {
                const version1View = await fetchVersion(version1.id)
                if (version1View !== undefined) diffInput1 = versionViewToDiffInput(version1View)
            }
        }

        if (version2 !== undefined) {
            if (version2 === 'current') {
                diffInput2 = currentGraphDataDiffInput ?? graphDataToDiffInput(getModelGraphData())
            } else if ("id" in version2) {
                const version2View = await fetchVersion(version2.id)
                if (version2View !== undefined) diffInput2 = versionViewToDiffInput(version2View)
            }
        }

        diff.value = modelVersionDiff(diffInput1, diffInput2)
    }


    return {
        ...useDialogOpenState(),
        versions: readonly(versions),
        refreshVersions,
        diff: readonly(diff),
        resetDiff,
    }
})