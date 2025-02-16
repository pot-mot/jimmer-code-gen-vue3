import {defineStore} from "pinia";
import {useDialogOpenState} from "@/components/global/dialog/DialogOpenState.ts";
import {computed, ref} from "vue";
import {
    GenerateFile,
    GenerateResult,
    IdName,
    TableEntityNotNullPair,
    TableEntityPair
} from "@/api/__generated/model/static";
import {api} from "@/api";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {GenerateTag} from "@/api/__generated/model/enums";

export type CodeFilterData = {
    text: string
    mainPairs: Array<TableEntityPair>
    negativeMainPairs: Array<TableEntityPair>
    mainEnum: Array<IdName>
    subPairs: Array<TableEntityPair>
    subEnum: Array<IdName>
    positiveTags: Array<GenerateTag>
    negativeTags: Array<GenerateTag>
}

const getDefaultFilterData = (): CodeFilterData => {
    return {
        text: '',
        mainPairs: [],
        negativeMainPairs: [],
        mainEnum: [],
        subPairs: [],
        subEnum: [],
        positiveTags: [],
        negativeTags: [],
    }
}

const filterFiles = (files: Array<GenerateFile>, data: CodeFilterData): Array<GenerateFile> => {
    const filterWords = data.text.split(/\s+/).filter(it => it.length > 0)

    const {positiveWords, negativeWords} = filterWords.reduce(
        (data: { positiveWords: string[], negativeWords: string[] }, word: string) => {
            if (word.startsWith('!')) {
                data.negativeWords.push(word.slice(1))
            } else {
                data.positiveWords.push(word)
            }
            return data
        },
        {positiveWords: [], negativeWords: []}
    )

    const filterTableIds = new Set(data.mainPairs.map(it => it.table?.id).filter(it => it !== undefined))
    const filterEntityIds = new Set(data.mainPairs.map(it => it.entity?.id).filter(it => it !== undefined))

    return files.filter(it => {
        if (data.mainPairs.length > 0) {
            if (!it.main) return false

            const {mainType, idName} = it.main
            if (mainType === "Table") {
                if (!filterTableIds.has(idName.id)) return false
            } else if (mainType === "Entity") {
                if (!filterEntityIds.has(idName.id)) return false
            } else {
                return false
            }
        }
        if (positiveWords.length > 0) {
            const inPositiveWords = positiveWords.every(word => it.path.includes(word))
            if (!inPositiveWords) return false
        }
        if (negativeWords.length > 0) {
            const inNegativeWords = negativeWords.some(word => it.path.includes(word))
            if (inNegativeWords) return false
        }
        if (data.positiveTags.length > 0) {
            const inPositiveTags = data.positiveTags.some(tag => it.tags.includes(tag))
            if (!inPositiveTags) return false
        }
        if (data.negativeTags.length > 0) {
            const inNegativeTags = data.negativeTags.some(tag => it.tags.includes(tag))
            if (inNegativeTags) return false
        }

        return true
    })
}

export const useMultiCodePreviewStore = defineStore(
    'MultiCodePreview', () => {
        const dialogOpenState = useDialogOpenState()

        const codes = ref<GenerateResult>({
            files: [],
            tableEntityPairs: [],
            enums: [],
        })

        const tableIdMap = computed(() => {
            const map = new Map<number, TableEntityNotNullPair>
            for (const pair of codes.value.tableEntityPairs) {
                map.set(pair.table.id, pair)
            }
            return map
        })

        const entityIdMap = computed(() => {
            const map = new Map<number, TableEntityNotNullPair>
            for (const pair of codes.value.tableEntityPairs) {
                map.set(pair.entity.id, pair)
            }
            return map
        })

        const enumIdMap = computed(() => {
            const map = new Map<number, IdName>
            for (const genEnum of codes.value.enums) {
                map.set(genEnum.id, genEnum)
            }
            return map
        })

        const filterData = ref<CodeFilterData>(getDefaultFilterData())

        const allFiles = computed(() => codes.value.files)

        const filteredFiles = computed(() => filterFiles(codes.value.files, filterData.value))

        dialogOpenState.on('close', () => {
            filterData.value = getDefaultFilterData()
        })

        return {
            codes,

            tableIdMap,
            entityIdMap,
            enumIdMap,

            filterData,
            allFiles,
            filteredFiles,

            ...dialogOpenState,

            codeRefresh: async () => {
                const modelId = useModelEditorStore().MODEL._model().id
                const result = await api.generateService.generateModel({id: modelId, types: ['ALL']})

                result.files.sort((a, b) => a.path.localeCompare(b.path))
                result.tableEntityPairs.sort((a, b) => a.table.name.localeCompare(b.table.name))
                result.enums.sort((a, b) => a.name.localeCompare(b.name))

                codes.value = result
            },
        }
    }
)
