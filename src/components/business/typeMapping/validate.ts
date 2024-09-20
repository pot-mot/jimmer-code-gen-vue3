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

    if (typeMappings.some(it => it.typeExpression.length === 0 || it.propertyType.length === 0)) {
        messageList.push('VALIDATE_GenTypeMapping_can_not_be_empty');
    }

    if (uniqueTypeMappings.length !== typeMappings.length) {
        messageList.push('VALIDATE_GenTypeMapping_can_not_be_repeat');
    }

    return messageList
}
