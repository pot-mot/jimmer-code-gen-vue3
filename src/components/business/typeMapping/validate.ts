import {uniqWith} from "lodash";
import {GenTypeMappingInput, GenTypeMappingView} from "@/api/__generated/model/static";
import {DeepReadonly} from "vue";
import {MainLocaleKey} from "@/i18n";

export const validateTypeMappingForm = (
    typeMappings: DeepReadonly<Array<GenTypeMappingView>>
): MainLocaleKey[] => {
    const messageList: MainLocaleKey[] = []

    const uniqueTypeMappings = uniqWith(typeMappings, (mapping1, mapping2) => {
        const keys = <(keyof GenTypeMappingInput)[]>['dataSourceType', 'language', 'propertyType', 'typeExpression']
        for (let key of keys) {
            if (mapping1[key] !== mapping2[key]) {
                return false
            }
        }
        return true
    })

    if (uniqueTypeMappings.length !== typeMappings.length) {
        messageList.push('VALIDATE_GenTypeMapping_cannot_be_duplicate');
    }

    typeMappings.forEach((typeMapping) => {
        if (!typeMapping.typeExpression) {
            messageList.push('VALIDATE_GenTypeMapping_typeExpression_cannot_be_empty')
        }
        if (!typeMapping.propertyType) {
            messageList.push('VALIDATE_GenTypeMapping_propertyType_cannot_be_empty')
        }
    })

    return messageList
}
