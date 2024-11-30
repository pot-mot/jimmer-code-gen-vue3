import { GenModelInput_TargetOf_enums } from "@/api/__generated/model/static"
import { DeepReadonly } from "vue"
import { MainLocaleKeyParam } from "@/i18n"

export const validateEnum = (
    genEnum: DeepReadonly<GenModelInput_TargetOf_enums>,
    otherEnums: DeepReadonly<Array<GenModelInput_TargetOf_enums>>,
): MainLocaleKeyParam[] => {
    const messageList: MainLocaleKeyParam[] = []

    if (genEnum.name.length === 0) {
        messageList.push('VALIDATE_GenEnum_nameCannotBeEmpty')
    }

    if (genEnum.items.length === 0) {
        messageList.push('VALIDATE_GenEnum_itemsCannotBeEmpty')
    }

    const defaultItem = genEnum.items.filter(it => it.defaultItem)
    if (defaultItem.length < 1) {
        messageList.push('VALIDATE_GenEnum_notNullDefaultItemRequired')
    }
    if (defaultItem.length > 1) {
        messageList.push('VALIDATE_GenEnum_defaultItemUnique')
    }

    for (let item of genEnum.items) {
        if (!item.name || item.name.length === 0) {
            messageList.push('VALIDATE_GenEnum_itemNameCannotBeEmpty')
            break
        }
    }

    const itemNameSet = new Set<string>()
    for (let item of genEnum.items) {
        if (itemNameSet.has(item.name)) {
            messageList.push({key: "VALIDATE_GenEnum_itemNameCannotBeDuplicate", args: [item.name]})
        } else {
            itemNameSet.add(item.name)
        }
    }

    if (genEnum.enumType === 'ORDINAL') {
        try {
            if (genEnum.items.some(item => !Number.isInteger(Number(item.mappedValue)))) {
                messageList.push('VALIDATE_GenEnum_ordinalValueMustBeInteger')
            }
        } catch (e) {
            messageList.push('VALIDATE_GenEnum_ordinalValueMustBeInteger')
        }
    }

    if (genEnum.enumType === "NAME" || genEnum.enumType === 'ORDINAL') {
        for (let item of genEnum.items) {
            if (item.mappedValue === null || item.mappedValue === undefined || item.mappedValue.length === 0) {
                messageList.push('VALIDATE_GenEnum_itemValueCannotBeEmpty')
                break
            }
        }

        const itemValueSet = new Set<string>()
        for (let item of genEnum.items) {
            if (itemValueSet.has(item.mappedValue)) {
                messageList.push({key: "VALIDATE_GenEnum_itemValueCannotBeDuplicate", args: [item.mappedValue]})
            } else {
                itemValueSet.add(item.mappedValue)
            }
        }
    }

    const otherEnumNameSet = new Set(otherEnums.map(it => it.name))
    if (otherEnumNameSet.has(genEnum.name)) {
        messageList.push({key: "VALIDATE_GenEnum_nameCannotBeDuplicate", args: [genEnum.name]})
    }

    return messageList
}
