import {GenModelInput_TargetOf_enums} from "@/api/__generated/model/static";

export const validateEnum = (
    genEnum: GenModelInput_TargetOf_enums
) => {
    const messageList: string[] = []

    if (genEnum.items.length === 0) {
        messageList.push('必须至少要有一个枚举项');
    }
    if (genEnum.items.some(item => item.name.length === 0)) {
        messageList.push('枚举项的名称必须不为空');
    } else {
        const uniqueItemNames = new Set(genEnum.items.map(item => item.name))
        if (uniqueItemNames.size !== genEnum.items.length) {
            messageList.push('枚举项的名称必须不重复');
        }
    }

    if (genEnum.enumType === 'ORDINAL') {
        try {
            if (genEnum.items.some(item => !Number.isInteger(Number(item.mappedValue)))) {
                messageList.push('ordinal 枚举项的值必须为整数');
            }

            genEnum.items.forEach((item) => {
                item.mappedValue = parseInt(item.mappedValue).toString()
            })
        } catch (e) {
            messageList.push('ordinal 枚举项的值必须为整数');
        }
    }

    if (genEnum.enumType === "NAME" || genEnum.enumType === 'ORDINAL') {
        if (genEnum.items.some(item => item.mappedValue.length === 0)) {
            messageList.push('枚举项的值必须不为空');
        } else {
            const uniqueItemNames = new Set(genEnum.items.map(item => item.mappedValue))
            if (uniqueItemNames.size !== genEnum.items.length) {
                messageList.push('枚举项的值必须不重复');
            }
        }
    }

    return messageList
}
