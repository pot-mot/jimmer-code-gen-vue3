import {
    EntityModelBusinessInput,
    EntityModelBusinessView,
    GenEntityConfigInput_TargetOf_properties,
    GenPropertyEntityConfigInput
} from "@/api/__generated/model/static";
import {MainLocaleKeyParam} from "@/i18n";
import {DeepReadonly} from "vue";

export const validateEntityWithProperties = (
    entity: DeepReadonly<EntityModelBusinessInput>,
    otherEntities: DeepReadonly<Array<EntityModelBusinessView>>,
): MainLocaleKeyParam[] => {
    const messageList: MainLocaleKeyParam[] = []

    if (entity.entity.name.length === 0) {
        messageList.push("VALIDATE_Entity_nameCannotBeEmpty")
    }

    for (const otherEntity of otherEntities) {
        if (otherEntity.tableConvertedEntity.name === entity.entity.name) {
            messageList.push({key: "VALIDATE_Entity_nameCannotBeDuplicate", args: [entity.entity.name]})
            break
        }
    }

    const propertyNameSet = new Set<string>()
    const allProperties: DeepReadonly<Array<GenEntityConfigInput_TargetOf_properties | GenPropertyEntityConfigInput>> = [
        ...entity.entity.properties,
        ...entity.properties,
    ]

    for (const property of allProperties) {
        if (!property.name || property.name.length === 0) {
            messageList.push("VALIDATE_Entity_propertyNameCannotBeEmpty")
            break
        }
    }

    for (const property of allProperties) {
        if (propertyNameSet.has(property.name)) {
            messageList.push({key: "VALIDATE_Entity_propertyNameCannotBeDuplicate", args: [property.name]})
        } else {
            propertyNameSet.add(property.name)
        }
    }

    for (const property of entity.properties) {
        if (!property.type || property.type.length === 0) {
            messageList.push({key: "VALIDATE_Entity_propertyTypeCannotBeEmpty", args: [property.name]})
        }
    }

    return messageList
}
