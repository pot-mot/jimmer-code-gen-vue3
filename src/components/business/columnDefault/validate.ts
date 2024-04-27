import {uniqWith} from "lodash";
import {GenColumnDefaultInput} from "@/api/__generated/model/static";

export const validateColumnDefaults = (
    columnDefaults: GenColumnDefaultInput[]
) => {
    const messageList: string[] = []

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
        messageList.push('ColumnDefault 的 dataSourceType 和 typeCode 不可重复');
    }

    columnDefaults.forEach((columnDefault) => {
        if (columnDefault.dataSize as number | null === null) {
            messageList.push('ColumnDefault 的 dataSize 不可为空');
        }
        if (columnDefault.numericPrecision as number | null === null) {
            messageList.push('ColumnDefault 的 numericPrecision 不可为空');
        }
    })

    return messageList
}
