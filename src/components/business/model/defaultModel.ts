import {GenModelInput} from "@/api/__generated/model/static";
import {
    DataSourceType_CONSTANTS,
    GenLanguage_CONSTANTS
} from "@/api/__generated/model/enums";
import {useGlobalGenConfigStore} from "@/components/business/genConfig/GlobalGenConfigStore.ts";

export const getDefaultModel = (): GenModelInput => {
    const genConfigStore = useGlobalGenConfigStore()

    const defaultModel: GenModelInput = {
        remark: "",
        name: "",
        syncConvertEntity: true,
        graphData: "",
        language: GenLanguage_CONSTANTS[0],
        dataSourceType: DataSourceType_CONSTANTS[0],
        author: "",
        packagePath: "",
        tablePath: "",
        lowerCaseName: true,
        realFk: true,
        idViewProperty: true,
        logicalDeletedAnnotation: "",
        tableAnnotation: true,
        columnAnnotation: true,
        joinTableAnnotation: true,
        joinColumnAnnotation: true,
        tableNamePrefixes: "",
        tableNameSuffixes: "",
        tableCommentPrefixes: "",
        tableCommentSuffixes: "",
        columnNamePrefixes: "",
        columnNameSuffixes: "",
        columnCommentPrefixes: "",
        columnCommentSuffixes: "",
        enums: [],
    }

    if (genConfigStore.isLoaded) {
        const globalGenConfig = genConfigStore.genConfig
        for (let key of Object.keys(globalGenConfig)) {
            if (key in defaultModel) {
                // @ts-ignore
                defaultModel[key] = globalGenConfig[key]
            }
        }
    }

    return defaultModel
}
