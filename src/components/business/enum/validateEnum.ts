import {GenModelInput_TargetOf_enums} from "@/api/__generated/model/static";
import {DeepReadonly} from "vue";

export const validateEnum = (
    genEnum: DeepReadonly<GenModelInput_TargetOf_enums>,
    otherEnums: DeepReadonly<Array<GenModelInput_TargetOf_enums>>,
): string[] => {
    const messageList: string[] = []

    if (genEnum.name.length === 0) {
        messageList.push('枚举名不得为空')
    }

    if (genEnum.items.length === 0) {
        messageList.push('必须至少有一个枚举项');
    }

    for (let item of genEnum.items) {
        if (!item.name || item.name.length === 0) {
            messageList.push('枚举项名称不得为空')
            break
        }
    }

    const itemNameSet = new Set<string>()
    for (let item of genEnum.items) {
        if (itemNameSet.has(item.name)) {
            messageList.push(`枚举项名称【${item.name}】不可重复`)
        } else {
            itemNameSet.add(item.name)
        }
    }

    if (genEnum.enumType === 'ORDINAL') {
        try {
            if (genEnum.items.some(item => !Number.isInteger(Number(item.mappedValue)))) {
                messageList.push('ordinal 枚举项的值必须为整数');
            }
        } catch (e) {
            messageList.push('ordinal 枚举项的值必须为整数');
        }
    }

    if (genEnum.enumType === "NAME" || genEnum.enumType === 'ORDINAL') {
        for (let item of genEnum.items) {
            if (!item.mappedValue || item.mappedValue.length === 0) {
                messageList.push('枚举项值不得为空')
                break
            }
        }

        const itemValueSet = new Set<string>()
        for (let item of genEnum.items) {
            if (itemValueSet.has(item.mappedValue)) {
                messageList.push(`枚举项值【${item.mappedValue}】不可重复`)
            } else {
                itemValueSet.add(item.name)
            }
        }
    }

    const otherEnumNameSet = new Set(otherEnums.map(it => it.name))
    if (otherEnumNameSet.has(genEnum.name)) {
        messageList.push(`枚举名【${genEnum.name}】与其他枚举重复`)
    }

    return messageList
}
