/**
     * 模型编辑相关
     */
import {GenModelInput} from "@/api/__generated/model/static";
import {validateModel} from "@/components/business/model/form/validateModel.ts";
import {sendMessage} from "@/message/message.ts";
import {api} from "@/api";


// FIXME 未来移除此处，提供主动调整 packagePath 的途径
const syncEnumPackagePath = (model: Readonly<GenModelInput>): GenModelInput => {
    return {
        ...model,
        enums: model.enums.map(it => {
            return {
                ...it,
                packagePath: model.packagePath
            }
        }),
    }
}

export const saveModel = async (model: GenModelInput) => {
    debugger

    const messageList = validateModel(model)

    if (messageList.length > 0) {
        messageList.forEach(it => sendMessage(it, 'warning'))
        return
    }

    const newModel = syncEnumPackagePath(model)

    return await api.modelService.save({body: newModel})
}