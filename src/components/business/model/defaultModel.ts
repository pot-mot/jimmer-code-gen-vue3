import {GenModelInput} from "@/api/__generated/model/static";
import {
    DataSourceType,
    DataSourceType_CONSTANTS,
    GenLanguage,
    GenLanguage_CONSTANTS
} from "@/api/__generated/model/enums";
import {useGenConfigStore} from "@/components/business/genConfig/GenConfigStore.ts";

export const getDefaultModel = (): GenModelInput => {
    const genConfigStore = useGenConfigStore()

    let language: GenLanguage = GenLanguage_CONSTANTS[0]
    let dataSourceType: DataSourceType = DataSourceType_CONSTANTS[0]
    let packagePath = ""

    if (genConfigStore.isLoaded) {
        language = genConfigStore.genConfig.language
        dataSourceType = genConfigStore.genConfig.dataSourceType
        packagePath = genConfigStore.genConfig.defaultPackagePath
    }

    return {
        name: "",
        remark: "",
        graphData: "",

        language,
        dataSourceType,
        packagePath,

        syncConvertEntity: true,

        enums: []
    }
}
