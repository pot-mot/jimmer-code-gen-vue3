import {uniqWith} from "lodash";
import {GenColumnDefaultInput} from "@/api/__generated/model/static";
import {DeepReadonly} from "vue";
import {MainLocaleKeyParam} from "@/i18n";

export const validateColumnDefaultForm = (
    columnDefaults: DeepReadonly<Array<GenColumnDefaultInput>>
): MainLocaleKeyParam[] => {
    const messageList: MainLocaleKeyParam[] = []

    const uniqueColumnDefaults = uniqWith(columnDefaults, (mapping1, mapping2) => {
        const keys = <(keyof GenColumnDefaultInput)[]>['dataSourceType', 'typeCode']
        for (let key of keys) {
            if (mapping1[key] !== mapping2[key]) {
                return false
            }
        }
        return true
    })

    if (uniqueColumnDefaults.length !== columnDefaults.length) {
        messageList.push('VALIDATE_GenTypeMapping_cannotBeDuplicate');
    }

    columnDefaults.forEach((columnDefault) => {
        if (!columnDefault.rawType) {
            messageList.push('VALIDATE_GenColumnDefault_rawType_cannotBeEmpty');
        }
        if (columnDefault.dataSize as number | null === null) {
            messageList.push('VALIDATE_GenColumnDefault_dataSize_cannotBeEmpty');
        }
        if (columnDefault.numericPrecision as number | null === null) {
            messageList.push('VALIDATE_GenColumnDefault_numericPrecision_cannotBeEmpty');
        }
    })

    return messageList
}
