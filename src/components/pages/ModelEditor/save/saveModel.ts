import {GenModelInput} from "@/api/__generated/model/static";
import {validateModel} from "@/components/business/model/form/validateModel.ts";
import {sendI18nMessage} from "@/message/message.ts";
import {api} from "@/api";
import {DeepReadonly} from "vue";

export const MODEL_VALID_NOT_PASS = Symbol("MODEL_VALID_NOT_PASS")

export const saveModel = async (model: DeepReadonly<GenModelInput>) => {
    const messageList = validateModel(model)

    if (messageList.length > 0) {
        messageList.forEach(it => sendI18nMessage(it, 'warning'))
        throw MODEL_VALID_NOT_PASS
    }

    return await api.modelService.save({body: model as GenModelInput})
}
