import {GenModelInput} from "@/api/__generated/model/static";
import {validateModel} from "@/components/business/model/form/validateModel.ts";
import {sendMessage} from "@/message/message.ts";
import {api} from "@/api";
import {DeepReadonly} from "vue";

export const saveModel = async (model: DeepReadonly<GenModelInput>) => {
    const messageList = validateModel(model)

    if (messageList.length > 0) {
        messageList.forEach(it => sendMessage(it, 'warning'))
        return
    }

    return await api.modelService.save({body: model as GenModelInput})
}
