import {GenModelInput} from "@/api/__generated/model/static";
import {DataSourceType_CONSTANTS, GenLanguage_CONSTANTS} from "@/api/__generated/model/enums";

export const defaultModel: GenModelInput = {
    name: "",
    remark: "",
    graphData: "",
    language: GenLanguage_CONSTANTS[0],
    dataSourceType: DataSourceType_CONSTANTS[0]
}
