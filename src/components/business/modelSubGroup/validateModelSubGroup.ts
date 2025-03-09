import {DeepReadonly} from "vue";
import {
    GenModelInput_TargetOf_subGroups,
} from "@/api/__generated/model/static";
import {MainLocaleKeyParam} from "@/i18n";

export const validateModelSubGroup = (
    subGroup: DeepReadonly<GenModelInput_TargetOf_subGroups>,
    otherSubGroups: DeepReadonly<Array<GenModelInput_TargetOf_subGroups>>,
): MainLocaleKeyParam[] => {
    const messageList: MainLocaleKeyParam[] = []

    if (subGroup.name.length === 0) {
        messageList.push("VALIDATE_ModelSubGroup_nameCannotBeEmpty")
    }

    for (const otherSubGroup of otherSubGroups) {
        if (otherSubGroup.name === subGroup.name) {
            messageList.push({key: "VALIDATE_ModelSubGroup_nameCannotBeDuplicate", args: [subGroup.name]})
            break
        }
    }

    return messageList
}