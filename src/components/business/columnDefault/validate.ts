import {uniqWith} from "lodash";
import {GenColumnDefaultInput} from "@/api/__generated/model/static";
import {DeepReadonly} from "vue";
import {MainLocaleKey} from "@/i18n";

export const validateColumnDefaultForm = (
    columnDefaults: DeepReadonly<Array<GenColumnDefaultInput>>
): MainLocaleKey[] => {
    const messageList: MainLocaleKey[] = []

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
        messageList.push('VALIDATE_GenTypeMapping_cannot_be_duplicate');
    }

    columnDefaults.forEach((columnDefault) => {
        if (!columnDefault.rawType) {
            messageList.push('VALIDATE_GenColumnDefault_rawType_cannot_be_empty');
        }
        if (columnDefault.dataSize as number | null === null) {
            messageList.push('VALIDATE_GenColumnDefault_dataSize_cannot_be_empty');
        }
        if (columnDefault.numericPrecision as number | null === null) {
            messageList.push('VALIDATE_GenColumnDefault_numericPrecision_cannot_be_empty');
        }
    })

    return messageList
}
