import {uniqWith} from "lodash";
import {GenTypeMappingInput, GenTypeMappingView} from "@/api/__generated/model/static";

export const validateTypeMappings = (
    typeMappings: GenTypeMappingView[]
) => {
    const messageList: string[] = []

    const uniqueTypeMappings = uniqWith(typeMappings, (mapping1, mapping2) => {
        const keys = <(keyof GenTypeMappingInput)[]>['dataSourceType', 'language', 'propertyType', 'typeExpression']
        for (let key of keys) {
            if (mapping1[key] !== mapping2[key]) {
                return false
            }
        }
        return true
    })

    if (typeMappings.some(it => it.typeExpression.length === 0 || it.propertyType.length === 0)) {
        messageList.push('TypeMapping 数据库类型表达式与属性均不可为空');
    }

    if (uniqueTypeMappings.length !== typeMappings.length) {
        messageList.push('TypeMapping 不可重复');
    }

    return messageList
}
